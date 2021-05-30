import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { environment } from 'src/environments/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<any>(null);
  tokenExpirationTimer!: any;

  private authUrl = {
    base: 'https://identitytoolkit.googleapis.com/v1/accounts:',
    API_KEY: environment.firebaseConfig.apiKey,
    signUp: 'signUp?key=',
    login: 'signInWithPassword?key=',
  };
  constructor(private https: HttpClient, private toastr: ToastrService) {}
  signUp(email: string, password: string) {
    const { base, API_KEY, signUp } = this.authUrl;
    return this.https
      .post<AuthResponseData>(base + signUp + API_KEY, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    const { base, API_KEY, login } = this.authUrl;
    return this.https
      .post<AuthResponseData>(base + login + API_KEY, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.toastr.warning('Logged Out');
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  handleError(errRes: HttpErrorResponse) {
    if (!errRes.error || !errRes.error.error) {
      return this.toastr.error(
        'Unknown Error!',
        'An unknown error just occurred!'
      );
    }
    switch (errRes.error.error.message) {
      case 'EMAIL_EXISTS':
        this.toastr.error(
          'This email already exist. Please use  different email.',
          'This Email Exists!'
        );
        break;
      case 'OPERATION_NOT_ALLOWED':
        this.toastr.error('Password sign-in disabled for this project.');
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.toastr.error(
          'We have blocked all requests from this device due to unusual activity. Try again later.'
        );
        break;
      case 'EMAIL_NOT_FOUND':
        this.toastr.info(
          "The email you entered doesn't belong to an account. Please check your email and try again.",
          '',
          {
            timeOut: 5000,
          }
        );
        this.toastr.error(
          'There is no user record corresponding to this identifier. The user may have been deleted.',
          'Email Not Found!'
        );

        break;
      case 'INVALID_PASSWORD':
        this.toastr.error(
          'Sorry, your password was incorrect. Please double-check your password.',
          'Invalid Password'
        );
        break;
      case 'USER_DISABLED':
        this.toastr.error(
          'The user account has been disabled by an administrator.'
        );
        break;
      default:
        break;
    }
    return;
  }
}

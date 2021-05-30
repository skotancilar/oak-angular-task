import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  isLoginMode = false;
  isLoading = false;
  error = {
    status: false,
    message: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  onSubmit() {
    if (!this.authForm.valid) {
      if (!this.authForm.controls.email.valid) {
        this.toastr.error('Your email is not valid', 'Invalid Email');
      } else if (!this.authForm.controls.password.valid) {
        this.toastr.error(
          'Your password must be at least 6 character',
          'Invalid Password'
        );
      } else {
        this.toastr.error('Something went wrong. Please try again', 'Opps!');
      }
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authService.signUp(email, password).subscribe(
        (res) => {
          this.isLoading = false;
          this.toastr.success('You signed up successfully.');
          this.isLoginMode = true;
        },
        (errRes) => {
          this.authService.handleError(errRes);
          this.isLoading = false;
        }
      );
    } else {
      this.authService.login(email, password).subscribe(
        (res) => {
          this.isLoading = false;
          this.router.navigate(['/times']);
          this.toastr.success('You logged in successfully.');
        },
        (errRes) => {
          this.authService.handleError(errRes);
          this.isLoading = false;
        }
      );
      this.isLoading = false;
    }
  }
}

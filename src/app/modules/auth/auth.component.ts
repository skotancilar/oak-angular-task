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
  isLoginMode = true;
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
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
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

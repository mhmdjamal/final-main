import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  formGroup!: FormGroup;
  formGroupLogin!: FormGroup;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    signUpButton?.addEventListener('click', () => {
      container?.classList.add('right-panel-active');
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove('right-panel-active');
    });

    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
          )
        ]
      ],
      name: [null, Validators.required]
    });

    this.formGroupLogin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
          )
        ]
      ]
    });
  }
  onSignupClicked() {
    // if (this.formGroup.invalid) {
    //   this.validateFormGroup();
    // } else {
    this.signup();
    // }
  }

  onloginClicked() {
    // if (this.formGroup.invalid) {
    //   this.validateFormGroup();
    // } else {
    this._authService.login(this.emailLogin.value, this.passwordLogin.value);
    // }
  }
  signup() {
    this._authService

      .signup(this.email.value, this.password.value)
      .pipe(
        switchMap((user: any) => {
          return this._authService.createUser(
            user.user.uid,
            this.name.value,
            this.email.value
          );
        })
      )
      .subscribe(() => {});
  }
  validateFormGroup() {
    Object.keys(this.formGroup.controls).forEach(filed => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  validateFormGroupLogin() {
    Object.keys(this.formGroup.controls).forEach(filed => {
      const control = this.formGroup.get(filed);
      control?.markAsTouched({ onlySelf: true });
    });
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Password not valid';
  }

  get email() {
    return this.formGroup.controls['email'] as FormControl;
  }

  get password() {
    return this.formGroup.controls['password'] as FormControl;
  }
  get name() {
    return this.formGroup.controls['name'] as FormControl;
  }

  get emailLogin() {
    return this.formGroupLogin.controls['email'] as FormControl;
  }

  get passwordLogin() {
    return this.formGroupLogin.controls['password'] as FormControl;
  }
}

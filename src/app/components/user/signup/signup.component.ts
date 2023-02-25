import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(private userService: UserService, private router: Router) {}
  signupForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit() {
    if (this.userService.isUserValid(this.email, this.password)) {
      this.userService.signUpUser(this.signupForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          Notiflix.Notify.success('Successfully signed up');
        },
        error: (res) => {
          Notiflix.Notify.failure(res.error.message);
        },
      });
    }
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }
}

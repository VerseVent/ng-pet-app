import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import * as Notiflix from 'notiflix';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../app.reducer';
import * as AUTH from '../../../shared/auth.actions';
import * as LOAD from '../../../shared/stores/loading/loading.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<{ auth: fromApp.State }>
  ) {}
  isUserLogged$: Observable<boolean>;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  onSubmit() {
    console.log('Login Component');
    if (this.userService.isUserValid(this.email, this.password)) {
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          // We can dispatch here
          // but in service better, cause it is more obvious
          this.store.dispatch(new AUTH.AuthUser());

          localStorage.setItem('auth_token', res.token);

          this.router.navigate(['/weather']);
          this.store.dispatch(new LOAD.StopLoading());

          console.log('SUCCESS:: loginComponent, onSubmit: ', res);

          Notiflix.Notify.success('Successfully logged in');
        },
        error: (res) => {
          // Show full store

          /*It will work as well, on error and gonna output value inside html
            as false for isUserLogged$
          */
          console.log('ERROR:: loginComponent, onSubmit: ', res);
          Notiflix.Notify.failure(res.error?.message);
        },
      });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

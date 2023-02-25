import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app.reducer';
import { map } from 'rxjs/operators';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLogged$: Observable<boolean>;
  constructor(
    private userService: UserService,
    private store: Store<fromRoot.State>,
    private router: Router
  ) {}

  logoutUser = () => {
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  };

  ngOnInit() {
    this.isUserLogged$ = this.store.select(fromRoot.getIsAuthenticated);
    // pipe(
    //   map((state) => state.auth.isUserAuthenticated)
    // );
  }
}

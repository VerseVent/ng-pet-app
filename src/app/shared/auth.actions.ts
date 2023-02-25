import { Action } from '@ngrx/store';

export const AUTH_USER: string = '[AUTH] Auth User';
export const OFF_USER: string = '[AUTH] Log out User';

// Better autocomplition support
export class AuthUser implements Action {
  readonly type = AUTH_USER;
}
export class OffUser implements Action {
  readonly type = OFF_USER;
}

export type AuthActions = AuthUser | OffUser;

import { AuthActions, AUTH_USER, OFF_USER } from './auth.actions';

export interface State {
  isUserAuthenticated: boolean;
}
const initialState: State = {
  isUserAuthenticated: false,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case AUTH_USER: {
      return {
        isUserAuthenticated: true,
      };
    }
    case OFF_USER: {
      return {
        isUserAuthenticated: false,
      };
    }
    default:
      return state;
  }
}

export const getIsUserAuthenticated = (state: State) =>
  state.isUserAuthenticated;

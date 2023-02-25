import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAuth from './shared/auth.reducer';
import * as fromLoad from './shared/stores/loading/loading.reducer';

export interface State {
  auth: fromAuth.State;
  load: fromLoad.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.authReducer,
  load: fromLoad.loadingReducer,
};

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(
  getAuthState,
  fromAuth.getIsUserAuthenticated
);
export const getLoadState = createFeatureSelector<fromLoad.State>('load');
export const getIsLoading = createSelector(getLoadState, fromLoad.getIsLoading);

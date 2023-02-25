import { Action } from '@ngrx/store';
import { START_LOADING, STOP_LOADING } from './loading.actions';
export interface State {
  isLoading: boolean;
}

const initialState = {
  isLoading: false,
};

export function loadingReducer(state = initialState, action: Action) {
  switch (action.type) {
    case START_LOADING:
      return {
        isLoading: true,
      };
    case STOP_LOADING:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;

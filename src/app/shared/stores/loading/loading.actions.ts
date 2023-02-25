import { Action } from '@ngrx/store';

export const START_LOADING: string = '[LOAD] Start Loading';
export const STOP_LOADING: string = '[LOAD] Stop Loading';

// Better autocomplition support
export class StartLoading implements Action {
  readonly type = START_LOADING;
}
export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

export type LoadingActions = StartLoading | StopLoading;

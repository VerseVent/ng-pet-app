import { createAction, props } from '@ngrx/store';
import { ISetting } from '../../../interfaces/ISetting';

export const setSettings = createAction(
  '[weather] set user settings',
  props<ISetting>()
);

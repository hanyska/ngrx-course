import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

const TAG = '[Login Page]';

export const login = createAction(
  `${TAG} User Login`,
  props<{user: User}>()
);

export const logout = createAction(
  `${TAG} User Logout`,
  props<{user: User}>()
);

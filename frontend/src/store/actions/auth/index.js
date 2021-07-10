import { createAction } from 'redux-actions';

export const requestGetCurrentUserAction = createAction('REQUEST/GET_CURRENT_USER');
export const loginAction = createAction('REQUEST/LOGIN');
export const enrollAccountAction = createAction('REQUEST/ENROLL_ACCOUNT');

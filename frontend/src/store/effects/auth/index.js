import Api from 'store/effects/core/api';
import { requestGetCurrentUserAction, requestPostLoginAction } from 'store/actions/auth';
import { getCurrentUser, login } from 'api/auth';

export const loginEffect = Api.execResult({ action: requestPostLoginAction, method: login });
export const getCurrentUserEffect = Api.execResult({ action: requestGetCurrentUserAction, method: getCurrentUser });

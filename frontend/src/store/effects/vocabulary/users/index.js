import { getUsersAction } from 'store/actions/vocabulary';
import { getUsers } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getUsersEffect = Api.execResult({ action: getUsersAction, method: getUsers });

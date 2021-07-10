import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { requestGetCurrentUserAction, loginAction, enrollAccountAction } from 'store/actions/auth';
import { get, omit } from 'lodash-es';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [requestGetCurrentUserAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data.user', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [loginAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data.user', initialData.data),
        meta: omit(get(payload, 'meta', initialData.meta), 'password'),
    }),
    [enrollAccountAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data.user', initialData.data),
        meta: omit(get(payload, 'meta', initialData.meta), 'password'),
    }),
}, initialData);

import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { requestGetCurrentUserAction, requestPostLoginAction } from 'store/actions/auth';
import { get } from 'lodash-es';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [requestGetCurrentUserAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [requestPostLoginAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
}, initialData);

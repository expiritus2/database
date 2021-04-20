import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { getResourcesAction } from 'store/actions/resources';
import { get } from 'lodash-es';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getResourcesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
}, initialData);

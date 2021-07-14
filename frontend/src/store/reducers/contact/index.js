import { handleActions } from 'redux-actions';
import { getContactAction, resetCurrentContactAction } from 'store/actions/contacts';
import { updateContactAction } from 'store/actions/forms/contact';
import { cloneDeep, get } from 'lodash-es';
import { IDLE } from 'settings/constants/apiState';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getContactAction]: (state, { payload }) => ({
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateContactAction]: (state, { payload }) => ({
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [resetCurrentContactAction]: () => initialData,
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

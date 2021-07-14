import { handleActions } from 'redux-actions';
import { openModalAction } from 'store/actions/app';
import { cloneDeep } from 'lodash-es';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    modal: {
        id: null,
        open: false,
        mode: null,
    },
};

export default handleActions({
    [openModalAction]: (state, { payload }) => ({
        ...state,
        modal: {
            id: payload.modalId,
            open: payload.open,
            mode: payload.mode,
        },
    }),
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

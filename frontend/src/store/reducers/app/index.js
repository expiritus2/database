import { handleActions } from 'redux-actions';
import { openModalAction } from 'store/actions/app';

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
}, initialData);

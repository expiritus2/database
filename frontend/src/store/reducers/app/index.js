import { handleActions } from 'redux-actions';
import { openModalAction, setSearchAction } from 'store/actions/app';

const initialData = {
    modal: {
        id: null,
        open: false,
        mode: null,
    },
    search: {
        string: '',
        active: false,
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
    [setSearchAction]: (state, { payload }) => ({
        ...state,
        search: {
            ...state.search,
            ...payload,
        },
    }),
}, initialData);

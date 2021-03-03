import { handleActions } from 'redux-actions';
import { setFilesFormStateAction, resetFilesFormStateAction } from 'store/actions/forms';
import { cloneDeep } from 'lodash-es';

const initialData = {

};

export default handleActions({
    [setFilesFormStateAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetFilesFormStateAction]: () => cloneDeep(initialData),
}, initialData);

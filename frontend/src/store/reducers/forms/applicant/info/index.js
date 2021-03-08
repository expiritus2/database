import { handleActions } from 'redux-actions';
import { setInfoFormStateAction, resetInfoFormStateAction } from 'store/actions/forms';
import { cloneDeep } from 'lodash-es';

const initialData = {
    nameLat: '',
    photo: [],
    birthDate: '',
    sex: '',
    phones: [{ type: '', number: '' }],
    emails: [''],
};

export default handleActions({
    [setInfoFormStateAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetInfoFormStateAction]: () => cloneDeep(initialData),
}, initialData);

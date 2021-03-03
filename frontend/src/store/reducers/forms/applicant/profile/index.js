import { handleActions } from 'redux-actions';
import { setProfileFormStateAction, resetProfileFormStateAction } from 'store/actions/forms';
import { cloneDeep } from 'lodash-es';

const initialData = {
    name: '',
    inActiveSearch: false,
    experience: '',
    salary: '',
    currency: '',
    education: '',
    position: [],
    skills: [],
    place: [],
};

export default handleActions({
    [setProfileFormStateAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetProfileFormStateAction]: () => cloneDeep(initialData),
}, initialData);

import { handleActions } from 'redux-actions';
import { setExperienceFormStateAction, resetExperienceFormStateAction } from 'store/actions/forms';
import { cloneDeep } from 'lodash-es';

export const initialData = [
    {
        period: [],
        company: '',
        position: [],
        info: '',
    },
];

export default handleActions({
    [setExperienceFormStateAction]: (state, { payload }) => payload,
    [resetExperienceFormStateAction]: () => cloneDeep(initialData),
}, initialData);

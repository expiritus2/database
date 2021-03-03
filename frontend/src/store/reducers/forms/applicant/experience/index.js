import { handleActions } from 'redux-actions';
import { setExperienceFormStateAction, resetExperienceFormStateAction } from 'store/actions/forms';
import { cloneDeep } from 'lodash-es';

const initialData = {

};

export default handleActions({
    [setExperienceFormStateAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetExperienceFormStateAction]: () => cloneDeep(initialData),
}, initialData);

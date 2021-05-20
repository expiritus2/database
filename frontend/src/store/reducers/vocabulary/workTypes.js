import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import { getVocabularyWorkTypesAction, saveVocabularyWorkTypeAction, deleteVocabularyWorkTypeAction, updateVocabularyWorkTypeAction } from 'store/actions/vocabulary';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyWorkTypesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyWorkTypeAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [deleteVocabularyWorkTypeAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularyWorkTypeAction]: (state, { payload }) => {
        const updatedWorkType = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedWorkType?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedWorkType;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
}, initialData);

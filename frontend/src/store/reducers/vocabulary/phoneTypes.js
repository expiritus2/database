import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import { getVocabularyPhoneTypesAction, saveVocabularyPhoneTypeAction, deleteVocabularyPhoneTypeAction, updateVocabularyPhoneTypeAction } from 'store/actions/vocabulary';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyPhoneTypesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyPhoneTypeAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [deleteVocabularyPhoneTypeAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularyPhoneTypeAction]: (state, { payload }) => {
        const updatedPhoneType = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedPhoneType?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedPhoneType;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
}, initialData);

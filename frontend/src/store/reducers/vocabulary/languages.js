import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import {
    getVocabularyLanguagesAction,
    saveVocabularyLanguageAction,
    deleteVocabularyLanguageAction,
    updateVocabularyLanguageAction,
    saveVocabularyLanguagesAction,
} from 'store/actions/vocabulary';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyLanguagesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyLanguagesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyLanguageAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [deleteVocabularyLanguageAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularyLanguageAction]: (state, { payload }) => {
        const updatedLanguage = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedLanguage?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedLanguage;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
}, initialData);

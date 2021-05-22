import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import {
    getVocabularyLanguageLevelsAction,
    saveVocabularyLanguageLevelAction,
    deleteVocabularyLanguageLevelAction,
    updateVocabularyLanguageLevelAction,
    saveVocabularyLanguageLevelsAction,
} from 'store/actions/vocabulary';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyLanguageLevelsAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyLanguageLevelsAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyLanguageLevelAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [deleteVocabularyLanguageLevelAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularyLanguageLevelAction]: (state, { payload }) => {
        const updatedLanguageLevel = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedLanguageLevel?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedLanguageLevel;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
}, initialData);

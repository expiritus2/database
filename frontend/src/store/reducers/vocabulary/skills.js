import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import {
    getVocabularySkillsAction,
    saveVocabularySkillAction,
    deleteVocabularySkillAction,
    updateVocabularySkillAction,
    saveVocabularySkillsAction,
} from 'store/actions/vocabulary';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularySkillsAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularySkillAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [saveVocabularySkillsAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [deleteVocabularySkillAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularySkillAction]: (state, { payload }) => {
        const updatedSkill = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedSkill?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedSkill;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
}, initialData);

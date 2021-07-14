import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import {
    getVocabularyLinkTypesAction,
    saveVocabularyLinkTypeAction,
    deleteVocabularyLinkTypeAction,
    updateVocabularyLinkTypeAction,
    saveVocabularyLinkTypesAction,
} from 'store/actions/vocabulary';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyLinkTypesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyLinkTypesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyLinkTypeAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [deleteVocabularyLinkTypeAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularyLinkTypeAction]: (state, { payload }) => {
        const updatedLinkType = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedLinkType?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedLinkType;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

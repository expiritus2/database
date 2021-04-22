import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import {
    getVocabularyResourcesAction,
    getVocabularyPositionsAction,
    getVocabularyRegionsAction,
    getVocabularySkillsAction,
    getVocabularyCompaniesAction,
    getVocabularyContactsAction,
} from 'store/actions/resources';
import { get } from 'lodash-es';

const initialData = {
    state: IDLE,
    data: {
        positions: [],
        regions: [],
        skills: [],
        companies: [],
        contacts: [],
    },
    meta: {},
};

export default handleActions({
    [getVocabularyResourcesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: {
            ...state.data,
            ...get(payload, 'data', initialData.data),
        },
        meta: get(payload, 'meta', initialData.meta),
    }),
    [getVocabularyPositionsAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...(state?.data || {}),
            positions: get(payload, 'data', []),
        },
    }),
    [getVocabularyRegionsAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...(state?.data || {}),
            regions: get(payload, 'data', []),
        },
    }),
    [getVocabularySkillsAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...(state?.data || {}),
            skills: get(payload, 'data', []),
        },
    }),
    [getVocabularyCompaniesAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...(state?.data || {}),
            companies: get(payload, 'data', []),
        },
    }),
    [getVocabularyContactsAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...(state?.data || {}),
            contacts: get(payload, 'data', []),
        },
    }),
}, initialData);

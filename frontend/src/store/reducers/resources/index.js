import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import {
    getVocabularyResourcesAction,
    getVocabularyPositionsAction,
    getVocabularyRegionsAction,
    getVocabularySkillsAction,
    getVocabularyCompaniesAction,
    getVocabularyContactsAction,
    getUsersAction,
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
        users: [],
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
    [getVocabularyCompaniesAction]: (state, { payload }) => {
        const companiesOptions = get(payload, 'data', [])
            .map((company) => ({ id: company?.id, value: company?.id, label: company?.name }));
        return ({
            ...state,
            data: {
                ...(state?.data || {}),
                companies: companiesOptions,
            },
        });
    },
    [getVocabularyContactsAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...(state?.data || {}),
            contacts: get(payload, 'data', []),
        },
    }),
    [getUsersAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...(state?.data || {}),
            users: get(payload, 'data', []),
        },
    }),
}, initialData);

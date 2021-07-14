import { handleActions } from 'redux-actions';
import { clearErrors } from 'store/helpers';
import {
    resetApplicantFormAction,
    setApplicantFormStateAction,
    createApplicantAction,
    setInitApplicantFormDataAction,
    updateApplicantAction,
} from 'store/actions/forms/applicant';
import { cloneDeep, get } from 'lodash-es';
import {
    emptyMessenger,
    emptyLink,
    emptyLanguageSkill,
    emptyPhone,
    emptyEmail,
    emptySalary,
} from 'settings/constants/templates';
import { IDLE } from 'settings/constants/apiState';
import { logoutAction } from 'store/actions/auth';

export const experienceInitialData = {
    period: [],
    company: '',
    positions: [],
    info: '',
};

const initialData = {
    state: IDLE,
    data: {
        name: '',
        inActiveSearch: false,
        salary: emptySalary,
        education: {},
        positions: [],
        skills: [],
        workPlaces: [],
        regions: [],
        address: '',
        languageSkills: [emptyLanguageSkill],
        info: '',
        nameLat: '',
        photos: [],
        birthDate: '',
        sex: {},
        phones: [emptyPhone],
        messengers: [emptyMessenger],
        links: [emptyLink],
        emails: [emptyEmail],
        files: [],
        experienceYears: 0,
        experiences: [
            experienceInitialData,
        ],
    },
    meta: {},
    errors: {},
};

export default handleActions({
    [setApplicantFormStateAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...state.data,
            ...payload,
        },
        errors: clearErrors(state.errors, payload),
    }),
    [createApplicantAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
        errors: get(payload, 'errors', initialData.errors),
    }),
    [updateApplicantAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
        errors: get(payload, 'errors', initialData.errors),
    }),
    [setInitApplicantFormDataAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...payload,
        },
        errors: cloneDeep(initialData.errors),
    }),
    [resetApplicantFormAction]: () => initialData,
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

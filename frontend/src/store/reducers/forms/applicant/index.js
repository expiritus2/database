import { handleActions } from 'redux-actions';
import {
    resetApplicantFormAction,
    setApplicantExperienceFormStateAction,
    setApplicantFormStateAction,
    submitApplicantFormAction,
    uploadFilesAction,
    setApplicantFormDataAction,
} from 'store/actions/forms/applicant';
import { IDLE } from 'settings/constants/apiState';
import { get } from 'lodash-es';

export const experienceInitialData = {
    period: [],
    company: '',
    positions: [],
    info: '',
};

const initialData = {
    name: '',
    inActiveSearch: false,
    salary: { amount: '', currency: '' },
    education: '',
    positions: [],
    skills: [],
    place: [],
    regions: [],
    address: '',
    languages: [{ name: '', level: '' }],
    info: '',
    nameLat: '',
    photos: [],
    birthDate: '',
    sex: '',
    phones: [{ type: '', number: '' }],
    emails: [''],
    files: [],
    experienceYears: '',
    experiences: [
        experienceInitialData,
    ],
    state: IDLE,
    meta: {},
};

export default handleActions({
    [setApplicantFormStateAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [uploadFilesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
    }),
    [submitApplicantFormAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setApplicantExperienceFormStateAction]: (state, { payload }) => ({
        ...state,
        experiences: payload,
    }),
    [setApplicantFormDataAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetApplicantFormAction]: () => initialData,
}, initialData);

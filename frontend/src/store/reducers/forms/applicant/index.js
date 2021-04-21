import { handleActions } from 'redux-actions';
import {
    resetApplicantFormAction,
    setApplicantExperienceFormStateAction,
    setApplicantFormStateAction,
    submitApplicantFormAction,
    uploadFilesAction,
    setApplicantFormDataAction,
} from 'store/actions/forms/applicant';
import { get } from 'lodash-es';

export const experienceInitialData = {
    period: [],
    company: {},
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
    messengers: [{ messenger: '', accountName: '' }],
    links: [{ type: '', link: '' }],
    emails: [''],
    files: [],
    experienceYears: 0,
    experiences: [
        experienceInitialData,
    ],
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
        experiences: [...payload],
    }),
    [setApplicantFormDataAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetApplicantFormAction]: () => initialData,
}, initialData);

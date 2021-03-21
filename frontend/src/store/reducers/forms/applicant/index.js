import { handleActions } from 'redux-actions';
import {
    resetApplicantFormSelector,
    setApplicantExperienceFormStateAction,
    setApplicantFormStateAction,
    submitApplicantFormAction,
    uploadFilesAction,
} from 'store/actions/forms/applicant';
import { IDLE } from 'settings/constants/apiState';
import { get } from 'lodash-es';

export const experienceInitialData = {
    period: [],
    company: '',
    position: [],
    info: '',
};

const initialData = {
    name: '',
    inActiveSearch: false,
    salary: { amount: '', currency: '' },
    education: '',
    position: [],
    skills: [],
    place: [],
    regions: [],
    address: '',
    languages: [],
    info: '',
    nameLat: '',
    photos: [],
    birthDate: '',
    sex: '',
    phones: [{ type: '', number: '' }],
    emails: [''],
    files: [],
    experienceYears: '',
    experience: [
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
        experience: payload,
    }),
    [resetApplicantFormSelector]: () => initialData,
}, initialData);

import { handleActions } from 'redux-actions';
import {
    resetApplicantFormAction,
    setApplicantExperienceFormStateAction,
    setApplicantFormStateAction,
    createApplicantAction,
    uploadFilesAction,
    setApplicantFormDataAction,
} from 'store/actions/forms/applicant';
import { get } from 'lodash-es';
import {
    emptyMessenger,
    emptyLink,
    emptyLanguageSkill,
    emptyPhone,
    emptyEmail,
    emptySalary,
} from 'settings/constants/templates';

export const experienceInitialData = {
    period: [],
    company: '',
    positions: [],
    info: '',
};

const initialData = {
    name: '',
    inActiveSearch: false,
    salary: emptySalary,
    education: '',
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
    [createApplicantAction]: (state, { payload }) => ({
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

import { handleActions } from 'redux-actions';
import {
    resetVacancyFormAction,
    setVacancyFormStateAction,
    submitVacancyFormAction,
    uploadVacancyFilesAction,
    setVacancyFormDataAction,
} from 'store/actions/forms/vacancy';
import { IDLE } from 'settings/constants/apiState';
import { get } from 'lodash-es';

const initialData = {
    active: false,
    positions: [],
    recruiters: [],
    company: '',
    contacts: [],
    salary: {
        min: '',
        max: '',
        currency: '',
    },
    experienceYears: '',
    skills: [],
    place: [],
    workSchedule: [],
    type: [],
    regions: [],
    test: null,
    info: '',
    files: [],

    state: IDLE,
    meta: {},
};

export default handleActions({
    [setVacancyFormStateAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [uploadVacancyFilesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
    }),
    [submitVacancyFormAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setVacancyFormDataAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetVacancyFormAction]: () => initialData,
}, initialData);
import { handleActions } from 'redux-actions';
import {
    resetVacancyFormAction,
    setVacancyFormStateAction,
    submitVacancyFormAction,
    uploadVacancyFilesAction,
    setVacancyFormDataAction,
} from 'store/actions/forms/vacancy';
import { get } from 'lodash-es';

const initialData = {
    active: false,
    position: null,
    users: [],
    company: {},
    contacts: [],
    salary: {
        min: '',
        max: '',
        currency: '',
    },
    experienceYears: 0,
    skills: [],
    place: [],
    workSchedule: [],
    regions: [],
    test: '',
    info: '',
    files: [],
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

import { handleActions } from 'redux-actions';
import {
    resetVacancyFormAction,
    setVacancyFormStateAction,
    createVacancyAction,
    setInitVacancyFormDataAction,
    updateVacancyAction,
} from 'store/actions/forms/vacancy';
import { cloneDeep, get } from 'lodash-es';
import { IDLE } from 'settings/constants/apiState';
import { clearErrors } from '../../../helpers';

const initialData = {
    state: IDLE,
    data: {
        active: false,
        position: null,
        users: [],
        company: {},
        contacts: [],
        salary: {
            min: '',
            max: '',
            currency: {},
        },
        experienceYears: 0,
        skills: [],
        workPlaces: [],
        workSchedule: [],
        regions: [],
        test: {},
        info: '',
        files: [],
    },
    meta: {},
    errors: {},
};

export default handleActions({
    [setVacancyFormStateAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...state.data,
            ...payload,
        },
        errors: clearErrors(state.errors, payload),
    }),
    [createVacancyAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
        errors: get(payload, 'errors', initialData.errors),
    }),
    [updateVacancyAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        meta: get(payload, 'meta', initialData.meta),
        errors: get(payload, 'errors', initialData.errors),
    }),
    [setInitVacancyFormDataAction]: (state, { payload }) => ({
        ...state,
        data: {
            ...payload,
        },
        errors: cloneDeep(initialData.errors),
    }),
    [resetVacancyFormAction]: () => initialData,
}, initialData);

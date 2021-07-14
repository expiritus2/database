import { handleActions } from 'redux-actions';
import { openVacancySearchDrawerAction, setVacancySearchFieldsAction, resetVacancySearchFieldsAction } from 'store/actions/drawers';
import { cloneDeep, get } from 'lodash-es';
import { setVacanciesSearchAction } from 'store/actions/vacancies';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    open: false,
    formFields: {
        active: false,
        position: null,
        users: [],
        company: {},
        contacts: [],
        salaryRange: {
            min: '',
            max: '',
            currency: {},
        },
        experienceRange: { min: '', max: '' },
        skills: [],
        workPlaces: [],
        workSchedules: [],
        workTypes: [],
        regions: [],
        updatedAt: null,
        createdAt: null,
    },
};

export default handleActions({
    [openVacancySearchDrawerAction]: (state, { payload }) => ({
        ...state,
        open: get(payload, 'open', initialData.open),
    }),
    [setVacanciesSearchAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            name: payload?.string || state?.name,
            active: payload?.active || state?.active,
        },
    }),
    [setVacancySearchFieldsAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            ...payload,
        },
    }),
    [resetVacancySearchFieldsAction]: (state) => ({
        ...state,
        formFields: cloneDeep(initialData.formFields),
    }),
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

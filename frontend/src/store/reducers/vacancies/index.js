import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { getVacanciesAction, setVacanciesSearchAction, deleteVacancyAction } from 'store/actions/vacancies';
import { updateVacancyAction } from 'store/actions/forms/vacancy';
import { cloneDeep, get } from 'lodash-es';
import { resetVacancySearchFieldsAction } from 'store/actions/drawers';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
    search: {
        string: '',
        active: false,
    },
};

export default handleActions({
    [getVacanciesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [deleteVacancyAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVacancyAction]: (state, { payload }) => {
        const data = get(payload, 'data.result', initialData.data);
        const rows = cloneDeep(state?.data?.rows) || [];

        const updatedIndex = rows.findIndex((vacancy) => vacancy?.id === data?.id);

        if (updatedIndex !== -1) {
            rows[updatedIndex] = data;
        }

        return ({
            ...state,
            state: payload.state,
            data: {
                ...(state?.data || []),
                rows,
            },
            meta: get(payload, 'meta', initialData.meta),
        });
    },
    [setVacanciesSearchAction]: (state, { payload }) => ({
        ...state,
        search: { ...payload },
    }),
    [resetVacancySearchFieldsAction]: (state) => ({
        ...state,
        search: cloneDeep(initialData.search),
    }),
}, initialData);

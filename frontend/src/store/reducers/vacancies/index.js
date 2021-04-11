import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import {
    getVacanciesAction,
    requestRefreshVacanciesAction,
    setVacanciesSearchAction,
} from 'store/actions/vacancies';
import { get } from 'lodash-es';

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
    [requestRefreshVacanciesAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setVacanciesSearchAction]: (state, { payload }) => ({
        ...state,
        search: { ...payload },
    }),
}, initialData);

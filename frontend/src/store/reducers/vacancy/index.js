import { handleActions } from 'redux-actions';
import { resetCurrentVacancyAction, getVacancyAction } from 'store/actions/vacancies';
import { updateVacancyAction } from 'store/actions/forms/vacancy';
import { cloneDeep, get } from 'lodash-es';
import { IDLE } from 'settings/constants/apiState';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVacancyAction]: (state, { payload }) => ({
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVacancyAction]: (state, { payload }) => ({
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [resetCurrentVacancyAction]: () => initialData,
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

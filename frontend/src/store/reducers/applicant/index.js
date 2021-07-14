import { handleActions } from 'redux-actions';
import { getApplicantAction, resetCurrentApplicantAction } from 'store/actions/applicants';
import { updateApplicantAction } from 'store/actions/forms/applicant';
import { cloneDeep, get } from 'lodash-es';
import { IDLE } from 'settings/constants/apiState';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getApplicantAction]: (state, { payload }) => ({
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateApplicantAction]: (state, { payload }) => ({
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [resetCurrentApplicantAction]: () => initialData,
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { getApplicantsAction } from 'store/actions/applicant';
import { get } from 'lodash-es';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getApplicantsAction]: (state, { payload }) => ({
        state: payload.static,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
}, initialData);

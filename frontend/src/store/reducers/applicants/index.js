import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import {
    getApplicantsAction,
    setApplicantsSearchAction,
    deleteApplicantAction,
} from 'store/actions/applicants';

import { updateApplicantAction } from 'store/actions/forms/applicant';
import { cloneDeep, get } from 'lodash-es';

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
    [getApplicantsAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [deleteApplicantAction]: (state, { payload }) => ({
        ...state,
        state: payload.state,
        data: get(payload, 'data.result', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [setApplicantsSearchAction]: (state, { payload }) => ({
        ...state,
        search: { ...payload },
    }),
    [updateApplicantAction]: (state, { payload }) => {
        const data = get(payload, 'data.result', initialData.data);
        const rows = cloneDeep(state?.data?.rows) || [];

        const updatedIndex = rows.findIndex((applicant) => applicant?.id === data?.id);

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
}, initialData);

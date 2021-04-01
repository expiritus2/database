import { handleActions } from 'redux-actions';
import { getApplicantsAction, resetCurrentApplicantAction, setCurrentApplicantAction } from 'store/actions/applicants';
import { get, find } from 'lodash-es';

const initialData = null;

export default handleActions({
    [setCurrentApplicantAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [getApplicantsAction]: (state, { payload }) => {
        const applicants = get(payload, 'data.result.rows');
        const currentApplicant = find(applicants, (applicant) => applicant?.id === state?.id);
        return currentApplicant ? { ...currentApplicant } : state;
    },
    [resetCurrentApplicantAction]: () => initialData,
}, initialData);

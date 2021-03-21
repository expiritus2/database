import { handleActions } from 'redux-actions';
import { resetCurrentApplicantAction, setCurrentApplicantAction } from 'store/actions/applicants';

const initialData = {};

export default handleActions({
    [setCurrentApplicantAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [resetCurrentApplicantAction]: () => initialData,
}, initialData);

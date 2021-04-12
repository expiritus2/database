import { handleActions } from 'redux-actions';
import { getCompaniesAction, resetCurrentCompanyAction, setCurrentCompanyAction } from 'store/actions/companies';
import { get, find } from 'lodash-es';

const initialData = null;

export default handleActions({
    [setCurrentCompanyAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [getCompaniesAction]: (state, { payload }) => {
        const contacts = get(payload, 'data.result.rows');
        const currentCompany = find(contacts, (applicant) => applicant?.id === state?.id);
        return currentCompany ? { ...currentCompany } : state;
    },
    [resetCurrentCompanyAction]: () => initialData,
}, initialData);

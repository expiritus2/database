import { handleActions } from 'redux-actions';
import { openCompanySearchDrawerAction, setCompanySearchFieldsAction, resetCompanySearchFieldsAction } from 'store/actions/drawers';
import { cloneDeep, get } from 'lodash-es';
import { setCompaniesSearchAction } from 'store/actions/companies';
import { emptyLink } from 'settings/constants/templates';

const initialData = {
    open: false,
    formFields: {
        active: false,
        id: '',
        name: '',
        users: [],
        activities: [],
        regions: [],
        link: emptyLink,
        updatedAt: null,
        createdAt: null,
    },
};

export default handleActions({
    [openCompanySearchDrawerAction]: (state, { payload }) => ({
        ...state,
        open: get(payload, 'open', initialData.open),
    }),
    [setCompaniesSearchAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            name: payload?.string || state?.name,
            active: payload?.active || state?.active,
        },
    }),
    [setCompanySearchFieldsAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            ...payload,
        },
    }),
    [resetCompanySearchFieldsAction]: (state) => ({
        ...state,
        formFields: cloneDeep(initialData.formFields),
    }),
}, initialData);

import { handleActions } from 'redux-actions';
import { openContactSearchDrawerAction, setContactSearchFieldsAction, resetContactSearchFieldsAction } from 'store/actions/drawers';
import { cloneDeep, get } from 'lodash-es';
import { setContactsSearchAction } from 'store/actions/contacts';
import { emptyEmail, emptyPhone } from 'settings/constants/templates';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    open: false,
    formFields: {
        active: false,
        id: '',
        name: '',
        users: [],
        positions: [],
        photos: [],
        birthDate: null,
        sex: {},
        phone: emptyPhone,
        email: emptyEmail,
        updatedAt: null,
        createdAt: null,
    },
};

export default handleActions({
    [openContactSearchDrawerAction]: (state, { payload }) => ({
        ...state,
        open: get(payload, 'open', initialData.open),
    }),
    [setContactsSearchAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            name: payload?.string || state?.name,
            active: payload?.active || state?.active,
        },
    }),
    [setContactSearchFieldsAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            ...payload,
        },
    }),
    [resetContactSearchFieldsAction]: (state) => ({
        ...state,
        formFields: cloneDeep(initialData.formFields),
    }),
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

import { handleActions } from 'redux-actions';
import { getContactsAction, resetCurrentContactAction, setCurrentContactAction } from 'store/actions/contacts';
import { get, find } from 'lodash-es';

const initialData = null;

export default handleActions({
    [setCurrentContactAction]: (state, { payload }) => ({
        ...state,
        ...payload,
    }),
    [getContactsAction]: (state, { payload }) => {
        const contacts = get(payload, 'data.result.rows');
        const currentContact = find(contacts, (applicant) => applicant?.id === state?.id);
        return currentContact ? { ...currentContact } : state;
    },
    [resetCurrentContactAction]: () => initialData,
}, initialData);

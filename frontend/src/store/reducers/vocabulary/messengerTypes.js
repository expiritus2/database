import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import {
    getVocabularyMessengerTypesAction,
    saveVocabularyMessengerTypeAction,
    deleteVocabularyMessengerTypeAction,
    updateVocabularyMessengerTypeAction,
    saveVocabularyMessengerTypesAction,
} from 'store/actions/vocabulary';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyMessengerTypesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyMessengerTypesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyMessengerTypeAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [deleteVocabularyMessengerTypeAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularyMessengerTypeAction]: (state, { payload }) => {
        const updatedMessengerType = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedMessengerType?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedMessengerType;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

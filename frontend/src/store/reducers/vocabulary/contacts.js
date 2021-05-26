import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { get } from 'lodash-es';
import { getVocabularyContactsAction } from 'store/actions/vocabulary';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyContactsAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
}, initialData);

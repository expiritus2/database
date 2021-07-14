import { handleActions } from 'redux-actions';
import { setVocabularyModeAction } from 'store/actions/vocabulary';
import { cloneDeep } from 'lodash-es';
import { logoutAction } from 'store/actions/auth';

const initialData = null;

export default handleActions({
    [setVocabularyModeAction]: (state, { payload }) => payload || initialData,
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

import { handleActions } from 'redux-actions';
import { setVocabularyModeAction } from 'store/actions/vocabulary';

const initialData = null;

export default handleActions({
    [setVocabularyModeAction]: (state, { payload }) => payload || initialData,
}, initialData);

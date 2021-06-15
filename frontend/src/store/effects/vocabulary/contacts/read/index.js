import { getVocabularyContactsAction } from 'store/actions/vocabulary';
import { getVocabularyContacts } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyContactsEffect = Api.execResult({
    action: getVocabularyContactsAction,
    method: getVocabularyContacts,
});

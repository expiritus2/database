import { getVocabularyCompaniesAction } from 'store/actions/vocabulary';
import { getVocabularyCompanies } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularyCompaniesEffect = Api.execResult({
    action: getVocabularyCompaniesAction,
    method: getVocabularyCompanies,
});

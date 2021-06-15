import { updateVocabularySexAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { updateVocabularySex } from 'api/vocabulary';

export const updateVocabularySexEffect = Api.execResult({
    action: updateVocabularySexAction,
    method: updateVocabularySex,
});

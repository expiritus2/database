import { deleteVocabularySexAction } from 'store/actions/vocabulary';
import Api from 'store/effects/core/api';
import { deleteVocabularySex } from 'api/vocabulary';

export const deleteVocabularySexEffect = Api.execResult({
    action: deleteVocabularySexAction,
    method: deleteVocabularySex,
});

import { saveVocabularySexAction, saveVocabularySexsAction } from 'store/actions/vocabulary';
import { saveVocabularySex, saveVocabularySexs } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const saveVocabularySexEffect = Api.execResult({
    action: saveVocabularySexAction,
    method: saveVocabularySex,
});

export const saveVocabularySexsEffect = Api.execResult({
    action: saveVocabularySexsAction,
    method: saveVocabularySexs,
});

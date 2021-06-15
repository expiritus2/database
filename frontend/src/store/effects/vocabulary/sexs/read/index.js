import { getVocabularySexsAction } from 'store/actions/vocabulary';
import { getVocabularySexs } from 'api/vocabulary';
import Api from 'store/effects/core/api';

export const getVocabularySexsEffect = Api.execResult({
    action: getVocabularySexsAction,
    method: getVocabularySexs,
});

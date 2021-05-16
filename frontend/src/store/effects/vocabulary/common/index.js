import { setVocabularyModeAction } from 'store/actions/vocabulary';

export const setVocabularyModeEffect = (cfg) => (dispatch) => {
    dispatch(setVocabularyModeAction(cfg));
};

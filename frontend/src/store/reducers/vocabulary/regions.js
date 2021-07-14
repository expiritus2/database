import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import {
    getVocabularyRegionsAction,
    saveVocabularyRegionAction,
    deleteVocabularyRegionAction,
    updateVocabularyRegionAction,
    saveVocabularyRegionsAction,
} from 'store/actions/vocabulary';
import { logoutAction } from 'store/actions/auth';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyRegionsAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyRegionsAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyRegionAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [deleteVocabularyRegionAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularyRegionAction]: (state, { payload }) => {
        const updatedRegion = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedRegion?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedRegion;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
    [logoutAction]: () => cloneDeep(initialData),
}, initialData);

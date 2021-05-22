import { handleActions } from 'redux-actions';
import { IDLE } from 'settings/constants/apiState';
import { cloneDeep, get } from 'lodash-es';
import {
    getVocabularyWorkSchedulesAction,
    saveVocabularyWorkScheduleAction,
    deleteVocabularyWorkScheduleAction,
    updateVocabularyWorkScheduleAction,
    saveVocabularyWorkSchedulesAction,
} from 'store/actions/vocabulary';

const initialData = {
    state: IDLE,
    data: null,
    meta: {},
};

export default handleActions({
    [getVocabularyWorkSchedulesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyWorkSchedulesAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [saveVocabularyWorkScheduleAction]: (state, { payload }) => {
        const data = get(payload, 'data');
        return {
            ...state,
            data: [...(state.data || []), data],
        };
    },
    [deleteVocabularyWorkScheduleAction]: (state, { payload }) => ({
        state: get(payload, 'state', initialData.state),
        data: get(payload, 'data', initialData.data),
        meta: get(payload, 'meta', initialData.meta),
    }),
    [updateVocabularyWorkScheduleAction]: (state, { payload }) => {
        const updatedWorkSchedule = get(payload, 'data', initialData.data);
        const copyData = cloneDeep(state.data);
        const itemIndex = (copyData || []).findIndex((skill) => skill?.id === updatedWorkSchedule?.id);

        if (itemIndex !== -1) {
            copyData[itemIndex] = updatedWorkSchedule;
        }
        return ({
            ...state,
            data: copyData,
        });
    },
}, initialData);

import { openVacancySearchDrawerAction, setVacancySearchFieldsAction, resetVacancySearchFieldsAction } from 'store/actions/drawers';

export function openVacancySearchDrawerEffect(cfg) {
    return (dispatch) => {
        dispatch(openVacancySearchDrawerAction(cfg));
    };
}

export function setVacancySearchFieldsEffect(cfg) {
    return (dispatch) => {
        dispatch(setVacancySearchFieldsAction(cfg));
    };
}

export function resetVacancySearchFieldsEffect(cfg) {
    return (dispatch) => {
        dispatch(resetVacancySearchFieldsAction(cfg));
    };
}

import { openCompanySearchDrawerAction, setCompanySearchFieldsAction, resetCompanySearchFieldsAction } from 'store/actions/drawers';

export function openCompanySearchDrawerEffect(cfg) {
    return (dispatch) => {
        dispatch(openCompanySearchDrawerAction(cfg));
    };
}

export function setCompanySearchFieldsEffect(cfg) {
    return (dispatch) => {
        dispatch(setCompanySearchFieldsAction(cfg));
    };
}

export function resetCompanySearchFieldsEffect(cfg) {
    return (dispatch) => {
        dispatch(resetCompanySearchFieldsAction(cfg));
    };
}

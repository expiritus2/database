import { openContactSearchDrawerAction, setContactSearchFieldsAction, resetContactSearchFieldsAction } from 'store/actions/drawers';

export function openContactSearchDrawerEffect(cfg) {
    return (dispatch) => {
        dispatch(openContactSearchDrawerAction(cfg));
    };
}

export function setContactSearchFieldsEffect(cfg) {
    return (dispatch) => {
        dispatch(setContactSearchFieldsAction(cfg));
    };
}

export function resetContactSearchFieldsEffect(cfg) {
    return (dispatch) => {
        dispatch(resetContactSearchFieldsAction(cfg));
    };
}

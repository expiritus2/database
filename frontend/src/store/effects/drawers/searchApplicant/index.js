import { openApplicantSearchDrawerAction, setApplicantSearchFieldsAction, resetApplicantSearchFieldsAction } from 'store/actions/drawers';

export function openApplicantSearchDrawerEffect(cfg) {
    return (dispatch) => {
        dispatch(openApplicantSearchDrawerAction(cfg));
    };
}

export function setApplicantSearchFieldsEffect(cfg) {
    return (dispatch) => {
        dispatch(setApplicantSearchFieldsAction(cfg));
    };
}

export function resetApplicantSearchFieldsEffect(cfg) {
    return (dispatch) => {
        dispatch(resetApplicantSearchFieldsAction(cfg));
    };
}

import { openApplicantSearchDrawerAction, setApplicantSearchFieldsAction } from 'store/actions/drawers';

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

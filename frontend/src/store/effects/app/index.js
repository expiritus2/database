import { openModalAction, setSearchAction } from 'store/actions/app';

export const openModalEffect = (cfg) => (dispatch) => {
    dispatch(openModalAction(cfg));
};

export const setSearchEffect = (cfg) => (dispatch) => {
    dispatch(setSearchAction(cfg));
};

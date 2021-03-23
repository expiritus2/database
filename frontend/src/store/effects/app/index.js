import { openModalAction } from 'store/actions/app';

export const openModalEffect = (cfg) => (dispatch) => {
    dispatch(openModalAction(cfg));
};

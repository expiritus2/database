import { createSelector } from 'reselect';
import { get } from 'lodash-es';

const localState = ({ app }) => app;

export const getModalStateSelector = createSelector(
    localState,
    (app) => get(app, 'modal'),
);

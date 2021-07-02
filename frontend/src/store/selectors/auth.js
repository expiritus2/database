import { createSelector } from 'reselect';
import { get } from 'lodash-es';

const localState = ({ user }) => user;

export const getUserSelector = createSelector(
    localState,
    (user) => user,
);

export const getUserEmail = createSelector(
    getUserSelector,
    (user) => get(user, 'data.email'),
);

export const getUserRoleSelector = createSelector(
    getUserSelector,
    ({ data }) => get(data, 'role'),
);

export const getIsAuthSelector = createSelector(
    getUserSelector,
    ({ data }) => !!data,
);

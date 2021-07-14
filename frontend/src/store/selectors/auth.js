import { createSelector } from 'reselect';
import { get } from 'lodash-es';
import { roles } from '../../settings/constants/user';

const localState = ({ user }) => user;

export const getUserSelector = createSelector(
    localState,
    (user) => user,
);

export const getUserData = createSelector(
    getUserSelector,
    (user) => get(user, 'data', {}),
);

export const getUserInfoSelector = createSelector(
    getUserData,
    (user) => ({
        ...user,
        isSuperAdmin: user?.role === roles.SUPER_ADMIN,
        isAdmin: user?.role === roles.ADMIN,
        isManager: user?.role === roles.MANAGER,
    }),
);

export const getUserEmail = createSelector(
    getUserSelector,
    (user) => get(user, 'data.email'),
);

export const getUserDisplayName = createSelector(
    getUserSelector,
    (user) => get(user, 'data.displayName'),
);

export const getUserRoleSelector = createSelector(
    getUserSelector,
    ({ data }) => get(data, 'role'),
);

export const getIsAuthSelector = createSelector(
    getUserSelector,
    ({ data }) => !!data,
);

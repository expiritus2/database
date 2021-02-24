import { routes } from 'settings/navigation/routes';
import { Main } from 'pages';
import { SUPER_ADMIN, ADMIN } from 'settings/constants/roles';

export default [
    {
        path: routes.index,
        component: Main,
        exact: true,
        roles: [SUPER_ADMIN, ADMIN],
    },
];

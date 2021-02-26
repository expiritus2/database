import { routes } from 'settings/navigation/routes';
import { Main, Applicants, Companies, Contacts, Events, Vacancies } from 'pages';
import { SUPER_ADMIN, ADMIN } from 'settings/constants/roles';

export default [
    {
        path: routes.index,
        component: Main,
        exact: true,
        roles: [SUPER_ADMIN, ADMIN],
    },
    {
        path: routes.applicants,
        component: Applicants,
        exact: true,
        roles: [SUPER_ADMIN, ADMIN],
    },
    {
        path: routes.companies,
        component: Companies,
        exact: true,
        roles: [SUPER_ADMIN, ADMIN],
    },
    {
        path: routes.contacts,
        component: Contacts,
        exact: true,
        roles: [SUPER_ADMIN, ADMIN],
    },
    {
        path: routes.events,
        component: Events,
        exact: true,
        roles: [SUPER_ADMIN, ADMIN],
    },
    {
        path: routes.vacancies,
        component: Vacancies,
        exact: true,
        roles: [SUPER_ADMIN, ADMIN],
    },
];

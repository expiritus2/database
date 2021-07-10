import { routes } from 'settings/navigation/routes';
import { Login, EnrollAccount, VerifyEmail } from 'pages';

export default [
    { path: routes.login, component: Login, exact: true },
    { path: routes.enrollAccount, component: EnrollAccount, exact: true },
    { path: routes.verifyEmail, component: VerifyEmail, exact: true },
];

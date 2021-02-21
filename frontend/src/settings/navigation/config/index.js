import { NotFound } from 'pages';
import commonRoutesConfig from './common';
import protectedRoutesConfig from './protected';

const allRoutes = [
    ...commonRoutesConfig,
    ...protectedRoutesConfig,
    { path: '*', component: NotFound },
];

export const protectedRoutes = allRoutes.filter((route) => !!route.roles).map(({ path }) => path);
export const matchProtectedRoutes = (pathname) => {
    const pathnameSplit = pathname.split('/');

    return protectedRoutes.some((protectedRoute) => {
        const protectedSplit = protectedRoute.split('/');

        return pathnameSplit.every((pathPart, index) => {
            const protectPath = protectedSplit[index];

            if (protectPath && protectPath.startsWith(':')) {
                return true;
            }

            return protectPath === pathPart;
        });
    });
};

export default allRoutes;

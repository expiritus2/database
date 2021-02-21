import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import routesConfig from 'settings/navigation/config';

import AppRoute from './AppRoute';

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            {routesConfig.map(({ path, component, exact, roles }) => (
                <AppRoute
                    key={path}
                    userRoles={[]}
                    routeRoles={roles}
                    path={path}
                    component={component}
                    exact={exact}
                />
            ))}
        </Switch>
    </BrowserRouter>
);

export default AppRouter;

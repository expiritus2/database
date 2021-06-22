import React from 'react';
import { HashRouter as Router, Switch } from 'react-router-dom';
import routesConfig from 'settings/navigation/config';
import { useSelector } from 'react-redux';

import { getUserRoleSelector } from 'store/selectors/auth';

import AppRoute from './AppRoute';
import VocabularyModal from '../VocabularyModal';

const AppRouter = () => {
    const userRole = useSelector(getUserRoleSelector);

    return (
        <Router>
            <Switch>
                {routesConfig.map(({ path, component, exact, roles }) => (
                    <AppRoute
                        key={path}
                        userRoles={[userRole]}
                        routeRoles={roles}
                        path={path}
                        component={component}
                        exact={exact}
                    />
                ))}
            </Switch>
            <VocabularyModal />
        </Router>
    );
};

export default AppRouter;

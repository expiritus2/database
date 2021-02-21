import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { routes } from 'settings/navigation/routes';
import { intersection } from 'lodash-es';

const AppRoute = ({ userRoles, routeRoles, path, component, exact }) => {
    if (routeRoles && (!userRoles || !intersection(userRoles, routeRoles).length)) {
        return <Redirect to={routes.login} />;
    }

    return (
        <Route key={path} path={path} component={component} exact={exact} />
    );
};

AppRoute.propTypes = {
    userRoles: PropTypes.arrayOf(PropTypes.string),
    routeRoles: PropTypes.arrayOf(PropTypes.string),
    path: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
    exact: PropTypes.bool,
};

AppRoute.defaultProps = {
    routeRoles: undefined,
    userRoles: undefined,
    exact: false,
};

export default AppRoute;

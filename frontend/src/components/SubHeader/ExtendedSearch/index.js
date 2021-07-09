import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
    openApplicantSearchDrawerEffect,
    openVacancySearchDrawerEffect,
    openCompanySearchDrawerEffect,
    openContactSearchDrawerEffect,
} from 'store/effects/drawers';
import { GiHamburgerMenu } from 'react-icons/gi';
import { routes } from 'settings/navigation/routes';

import styles from './styles.module.scss';

const ExtendedSearch = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const location = useLocation();

    const onClick = () => {
        let effect;
        switch (location.pathname) {
            case routes.applicants: { effect = openApplicantSearchDrawerEffect; break; }
            case routes.vacancies: { effect = openVacancySearchDrawerEffect; break; }
            case routes.companies: { effect = openCompanySearchDrawerEffect; break; }
            case routes.contacts: { effect = openContactSearchDrawerEffect; break; }
            default: { effect = null; break; }
        }

        if (effect) {
            dispatch(effect({ open: true }));
        }
    };

    return (
        <div className={classNames(styles.extendedSearch, className)}>
            <GiHamburgerMenu onClick={onClick} className={styles.icon} />
        </div>
    );
};

ExtendedSearch.propTypes = {
    className: PropTypes.string,
};

ExtendedSearch.defaultProps = {
    className: '',
};

export default ExtendedSearch;

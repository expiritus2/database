import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openModalEffect } from 'store/effects/app';
import { NavLink, useLocation } from 'react-router-dom';
import { modalsIds } from 'settings/constants/modals';
import { Button } from 'components';
import { useTranslate } from 'hooks';
import { ADD } from 'settings/constants/mode';
import { routes } from 'settings/navigation/routes';
import { getUserEmail } from 'store/selectors/auth';

import styles from './styles.module.scss';

const Header = () => {
    const userEmail = useSelector(getUserEmail);
    const location = useLocation();
    const dispatch = useDispatch();
    const { translate } = useTranslate();

    const onAddHandler = () => {
        dispatch(openModalEffect({ modalId: location.pathname, open: true, mode: ADD }));
    };

    const onVocabulariesClick = () => {
        dispatch(openModalEffect({ modalId: modalsIds.VOCABULARIES, open: true }));
    };

    return (
        <div className={styles.header}>
            <div className={styles.toolbar}>
                <nav>
                    {Header.getNavigation(translate).map(({ id, link, label }) => (
                        <NavLink
                            exact
                            key={id}
                            to={link}
                            className={styles.link}
                            activeClassName={styles.active}
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <div>
                    <Button
                        onClick={onAddHandler}
                        className={styles.navButton}
                        variant="contained"
                        color="default"
                    >
                        {translate.Add}
                    </Button>
                    <Button className={styles.navButton} variant="contained" color="default">{userEmail}</Button>
                    <Button
                        onClick={onVocabulariesClick}
                        className={styles.navButton}
                        variant="contained"
                        color="default"
                    >
                        {translate.Vocabularies}
                    </Button>
                </div>
            </div>
        </div>
    );
};

Header.navIds = {
    main: 'main',
    events: 'events',
    applicants: 'applicants',
    vacancies: 'vacancies',
    companies: 'companies',
    contacts: 'contacts',

};
Header.getNavigation = (translate) => [
    { id: Header.navIds.main, link: routes.index, label: translate.Main },
    { id: Header.navIds.events, link: routes.events, label: translate.Events },
    { id: Header.navIds.applicants, link: routes.applicants, label: translate.Applicants },
    { id: Header.navIds.vacancies, link: routes.vacancies, label: translate.Vacancies },
    { id: Header.navIds.companies, link: routes.companies, label: translate.Companies },
    { id: Header.navIds.contacts, link: routes.contacts, label: translate.Contacts },
];

export default Header;

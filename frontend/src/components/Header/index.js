import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openModalEffect } from 'store/effects/app';
import { NavLink, useLocation } from 'react-router-dom';
import { modalsIds } from 'settings/constants/modals';
import { Button } from 'components/Form';
import { useTranslate } from 'hooks';
import { ADD } from 'settings/constants/mode';
import { routes } from 'settings/navigation/routes';
import { getUserEmail } from 'store/selectors/auth';
import { Logger } from 'services';
import { apiServer } from '../../settings/web-services/api';

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

    const onAddFakeData = () => {
        apiServer.get(`/api/fake${location.pathname}`).then(() => {
            Logger.log('Success');
        });
    };

    const onDeleteFakeData = () => {
        apiServer.delete(`/api/fake${location.pathname}`).then(() => {
            Logger.log('Success');
        });
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
                        onClick={onAddFakeData}
                        className={styles.navButton}
                        title="Add Data"
                    />
                    <Button
                        onClick={onDeleteFakeData}
                        className={styles.navButton}
                        title="Delete Data"
                    />
                    <Button
                        onClick={onAddHandler}
                        className={styles.navButton}
                        title={translate.Add}
                    />
                    <Button
                        className={styles.navButton}
                        title={userEmail}
                    />
                    <Button
                        onClick={onVocabulariesClick}
                        className={styles.navButton}
                        title={translate.Vocabularies}
                    />
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

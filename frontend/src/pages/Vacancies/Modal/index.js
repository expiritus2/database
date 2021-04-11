import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { Button, Modal, Tabs } from 'components';
import { useTranslate } from 'hooks';
import { ADD, EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { submitVacancyFormEffect, updateVacancyFormEffect, resetVacancyFormEffect } from 'store/effects/forms/vacancy';
import { getVacanciesEffect } from 'store/effects/vacancies';
import ProfileForm from '../ProfileForm';
import FilesForm from '../FilesForm';

import styles from './styles.module.scss';

const ModalComponent = ({ className }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const modal = useSelector(getModalStateSelector);
    const { translate } = useTranslate();
    const [isPending, setIsPending] = useState();

    const handleClose = () => {
        dispatch(openModalEffect({ modalId: modal.id, open: false }));

        if (modal.mode === EDIT) {
            dispatch(resetVacancyFormEffect());
        }
    };

    const handleReset = () => {
        dispatch(resetVacancyFormEffect());
    };

    const getTitle = () => {
        if (modal.mode === ADD) {
            return translate.AddVacancy;
        }

        if (modal.mode === EDIT) {
            return translate.EditVacancy;
        }
    };

    const onSubmit = () => {
        let effect = submitVacancyFormEffect;
        if (modal.mode === EDIT) {
            effect = updateVacancyFormEffect;
        }
        setIsPending(true);
        dispatch(effect({}, {}, (err) => {
            if (!err) {
                dispatch(openModalEffect({ modalId: null, open: false, mode: null }));
                dispatch(getVacanciesEffect({}, {}, () => {
                    setIsPending(false);
                }));
            }
        }));
    };

    const getActions = () => (
        <div className={styles.actionButtons}>
            <Button
                className={styles.btn}
                color="primary"
                isPending={isPending}
                onClick={onSubmit}
            >
                {translate.Save}
            </Button>
            <Button onClick={handleClose} className={styles.btn}>{translate.Cancel}</Button>
            <Button onClick={handleReset} className={styles.btn}>{translate.Reset}</Button>
        </div>
    );

    return (
        <Modal
            title={getTitle()}
            className={classNames(className)}
            open={location.pathname === modal.id && modal.open}
            onClose={handleClose}
            cardActionsClassName={styles.cardActions}
            actionsChildren={getActions()}
        >
            <Tabs
                formId={modal.id}
                tabsClassName={styles.tabs}
                tabs={ModalComponent.tabs(translate)}
            />
        </Modal>
    );
};

ModalComponent.tabs = (translate) => [
    { id: 'profile', label: translate.Profile, Component: ProfileForm },

    { id: 'files', label: translate.Files, Component: FilesForm },
];

ModalComponent.propTypes = {
    className: PropTypes.string,
};

ModalComponent.defaultProps = {
    className: '',
};

export default ModalComponent;

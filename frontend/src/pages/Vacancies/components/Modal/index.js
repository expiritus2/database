import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { Button } from 'components/Form';
import { Modal, ModalTabs } from 'components';
import { useTranslate } from 'hooks';
import { ADD, EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { createVacancyEffect, updateVacancyEffect, resetVacancyFormEffect } from 'store/effects/forms/vacancy';
import { getVacanciesEffect } from 'store/effects/vacancies';
import { resetApplicantFormEffect } from 'store/effects/forms/applicant';
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
        setIsPending(true);

        const effect = modal.mode === EDIT ? updateVacancyEffect : createVacancyEffect;
        dispatch(effect({}, { silent: true }, (err) => {
            if (!err) {
                if (modal.mode === ADD) {
                    return dispatch(getVacanciesEffect({}, { silent: true }, () => {
                        dispatch(resetVacancyFormEffect());
                        dispatch(openModalEffect({ modalId: null, open: false, mode: null }));
                        setIsPending(false);
                    }));
                }

                dispatch(resetApplicantFormEffect());
                dispatch(openModalEffect({ modalId: null, open: false, mode: null }));
            }
            setIsPending(false);
        }));
    };

    const getActions = () => (
        <div className={styles.actionButtons}>
            <Button
                className={styles.btn}
                color="primary"
                isPending={isPending}
                onClick={onSubmit}
                title={translate.Save}
            />
            <Button onClick={handleClose} className={styles.btn} title={translate.Cancel} />
            <Button onClick={handleReset} className={styles.btn} title={translate.Reset} />
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
            <ModalTabs formId={modal.id} tabs={ModalComponent.tabs(translate)} />
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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { Modal, ModalTabs } from 'components';
import { Button } from 'components/Form';
import { useTranslate } from 'hooks';
import { ADD, EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { createApplicantFormEffect, updateApplicantFormEffect, resetApplicantFormEffect } from 'store/effects/forms/applicant';
import { getApplicantsEffect } from 'store/effects/applicants';
import { InfoForm, FilesForm, ProfileForm, ExperienceForm } from '..';

import styles from './styles.module.scss';

const ModalComponent = ({ className }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const modal = useSelector(getModalStateSelector);
    const { translate } = useTranslate();
    const [isPending, setIsPending] = useState(false);

    const handleClose = () => {
        dispatch(openModalEffect({ modalId: modal.id, open: false }));

        if (modal.mode === EDIT) {
            dispatch(resetApplicantFormEffect());
        }
    };

    const handleReset = () => {
        dispatch(resetApplicantFormEffect());
    };

    const getTitle = () => {
        if (modal.mode === ADD) {
            return translate.AddApplicant;
        }

        if (modal.mode === EDIT) {
            return translate.EditApplicant;
        }
    };

    const onSubmit = () => {
        setIsPending(true);

        const effect = modal.mode === EDIT ? updateApplicantFormEffect : createApplicantFormEffect;
        dispatch(effect({}, { silent: true }, (err) => {
            if (!err) {
                if (modal.mode === ADD) {
                    return dispatch(getApplicantsEffect({}, { silent: true }, () => {
                        dispatch(resetApplicantFormEffect());
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
            <Button title={translate.Cancel} onClick={handleClose} className={styles.btn} />
            <Button title={translate.Reset} onClick={handleReset} className={styles.btn} />
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
    { id: 'info', label: translate.Info, Component: InfoForm },
    { id: 'experience', label: translate.Experience, Component: ExperienceForm },
    { id: 'files', label: translate.Files, Component: FilesForm },
];

ModalComponent.propTypes = {
    className: PropTypes.string,
};

ModalComponent.defaultProps = {
    className: '',
};

export default ModalComponent;

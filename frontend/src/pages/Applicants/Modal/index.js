import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { Button, Modal, Tabs } from 'components';
import { useTranslate } from 'hooks';
import { ADD, EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantFormStateSelector } from 'store/selectors/applicantForm';

import { PENDING } from 'settings/constants/apiState';
import { submitApplicantFormEffect } from 'store/effects/forms/applicant';
import { getApplicantsEffect } from 'store/effects/applicants';
import InfoForm from '../InfoForm';
import FilesForm from '../FilesForm';
import ProfileForm from '../ProfileForm';
import ExperienceForm from '../ExperienceForm';

import styles from './styles.module.scss';

const ModalComponent = ({ className }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const modal = useSelector(getModalStateSelector);
    const state = useSelector(getApplicantFormStateSelector);
    const { translate } = useTranslate();

    const isPending = state === PENDING;

    const handleClose = () => {
        dispatch(openModalEffect({ modalId: modal.id, open: false }));
    };

    const getTitle = () => {
        if (modal.mode === ADD) {
            return translate.Add;
        }

        if (modal.mode === EDIT) {
            return translate.Edit;
        }
    };

    const onSubmit = () => {
        dispatch(submitApplicantFormEffect({}, {}, (err) => {
            if (!err) {
                dispatch(openModalEffect({ modalId: null, open: true, mode: null }));
                dispatch(getApplicantsEffect());
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
            {modal?.mode === EDIT && (
                <Button isPending={isPending} className={styles.btn} color="secondary">{translate.Delete}</Button>
            )}
            <Button onClick={handleClose} className={styles.btn}>{translate.Cancel}</Button>
        </div>
    );

    return (
        <Modal
            title={getTitle}
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

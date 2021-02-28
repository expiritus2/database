import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { Modal, Tabs } from 'components';
import { useTranslate } from 'hooks';
import { ADD, EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';

import ProfileForm from './ProfileForm';
import InfoForm from './InfoForm';
import ExperienceForm from './ExperienceForm';
import FilesForm from './FilesForm';

import styles from './styles.module.scss';

const ApplicantModal = ({ className }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const modal = useSelector(getModalStateSelector);
    const { translate } = useTranslate();

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

    return (
        <Modal
            title={getTitle}
            className={classNames(className)}
            open={location.pathname === modal.id && modal.open}
            onClose={handleClose}
            cardActionsClassName={styles.cardActions}
        >
            <Tabs tabsClassName={styles.tabs} tabs={ApplicantModal.tabs(translate)} />
        </Modal>
    );
};

ApplicantModal.tabs = (translate) => [
    { id: 'profile', label: translate.Profile, Component: ProfileForm },
    { id: 'info', label: translate.Info, Component: InfoForm },
    { id: 'experience', label: translate.Experience, Component: ExperienceForm },
    { id: 'files', label: translate.Files, Component: FilesForm },
];

ApplicantModal.propTypes = {
    className: PropTypes.string,
};

ApplicantModal.defaultProps = {
    className: '',
};

export default ApplicantModal;

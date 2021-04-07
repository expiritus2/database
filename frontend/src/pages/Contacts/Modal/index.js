import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { Button, Modal } from 'components';
import { useTranslate } from 'hooks';
import { ADD, EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { submitContactFormEffect, updateContactFormEffect, resetContactFormEffect } from 'store/effects/forms/contact';
import { getContactsEffect } from 'store/effects/contacts';
import Form from '../Form';

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
            dispatch(resetContactFormEffect());
        }
    };

    const handleReset = () => {
        dispatch(resetContactFormEffect());
    };

    const getTitle = () => {
        if (modal.mode === ADD) {
            return translate.AddContact;
        }

        if (modal.mode === EDIT) {
            return translate.EditContact;
        }
    };

    const onSubmit = () => {
        let effect = submitContactFormEffect;
        if (modal.mode === EDIT) {
            effect = updateContactFormEffect;
        }
        setIsPending(true);
        dispatch(effect({}, {}, (err) => {
            if (!err) {
                dispatch(openModalEffect({ modalId: null, open: false, mode: null }));
                dispatch(getContactsEffect({}, {}, () => {
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
            <Form formId={modal.id} />
        </Modal>
    );
};

ModalComponent.propTypes = {
    className: PropTypes.string,
};

ModalComponent.defaultProps = {
    className: '',
};

export default ModalComponent;

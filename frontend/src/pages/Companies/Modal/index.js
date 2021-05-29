import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import { Modal } from 'components';
import { Button } from 'components/Form-NEW';
import { useTranslate } from 'hooks';
import { ADD, EDIT } from 'settings/constants/mode';
import { openModalEffect } from 'store/effects/app';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { submitCompanyFormEffect, updateCompanyFormEffect, resetCompanyFormEffect } from 'store/effects/forms/company';
import { getCompaniesEffect } from 'store/effects/companies';
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
            dispatch(resetCompanyFormEffect());
        }
    };

    const handleReset = () => {
        dispatch(resetCompanyFormEffect());
    };

    const getTitle = () => {
        if (modal.mode === ADD) {
            return translate.AddCompany;
        }

        if (modal.mode === EDIT) {
            return translate.EditCompany;
        }
    };

    const onSubmit = () => {
        let effect = submitCompanyFormEffect;
        if (modal.mode === EDIT) {
            effect = updateCompanyFormEffect;
        }
        setIsPending(true);
        dispatch(effect({}, {}, (err) => {
            if (!err) {
                dispatch(openModalEffect({ modalId: null, open: false, mode: null }));
                dispatch(getCompaniesEffect());
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
            <Button
                onClick={handleClose}
                className={styles.btn}
                title={translate.Cancel}
            />
            <Button
                onClick={handleReset}
                className={styles.btn}
                title={translate.Reset}
            />
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

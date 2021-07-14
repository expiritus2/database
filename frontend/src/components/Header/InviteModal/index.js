import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { inviteEffect } from 'store/effects/auth';
import { useTranslate } from 'hooks';

import { Modal } from 'components';

import { useFormik } from 'formik';
import styles from './styles.module.scss';
import { Button, Input } from '../../Form';
import { ValidationSchema } from './validation';

const InviteModal = (props) => {
    const { className, isOpen, setIsOpen } = props;
    const dispatch = useDispatch();
    const [isPending, setIsPending] = useState(false);
    const { translate } = useTranslate();

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: ValidationSchema(translate),
        onSubmit(values) {
            setIsPending(true);
            dispatch(inviteEffect(values, {}, (err) => {
                if (!err) {
                    setIsOpen(false);
                    formik.resetForm();
                }
                setIsPending(false);
            }));
        },
    });

    const onClose = () => {
        setIsOpen(false);
        formik.resetForm();
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            className={classNames(styles.inviteModal, className)}
            modalContentClassName={styles.modalCardContent}
            cardContentClassName={styles.cardContent}
            title={translate.Invite}
            actionsChildren={(
                <Button
                    isPending={isPending}
                    onClick={formik.submitForm}
                    title={translate.SendInvite}
                    className={styles.inviteBtn}
                />
            )}
            cardActionsClassName={styles.modalActions}
        >
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.inputWrapper}>
                    <Input
                        name="email"
                        className={classNames(styles.field, styles.email)}
                        label={translate.Email}
                        value={formik?.values?.email}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className={styles.error}>{formik.errors.email}</div>
                    )}
                </div>
            </form>
        </Modal>
    );
};

InviteModal.propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
};

InviteModal.defaultProps = {
    className: '',
    isOpen: false,
    setIsOpen: () => {},
};

export default InviteModal;

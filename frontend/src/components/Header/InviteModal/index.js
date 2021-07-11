import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';

import { Modal } from 'components';

import { useFormik } from 'formik';
import { Logger } from 'services';
import styles from './styles.module.scss';
import { Button, Input } from '../../Form';
import { ValidationSchema } from './validation';

const InviteModal = (props) => {
    const { className, isOpen, setIsOpen } = props;
    const { translate } = useTranslate();

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: ValidationSchema(translate),
        onSubmit(values) {
            Logger.log(values);
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
            actionsChildren={<Button onClick={formik.submitForm} title={translate.SendInvite} />}
            cardActionsClassName={styles.modalActions}
        >
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Input
                    name="email"
                    className={styles.field}
                    label={translate.Email}
                    value={formik?.values?.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && formik.errors.email}
                />
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

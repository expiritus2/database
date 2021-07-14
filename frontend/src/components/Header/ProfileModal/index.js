import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslate } from 'hooks';
import { Modal, Role } from 'components';
import { Button, Input } from 'components/Form';
import { updateUserEffect } from 'store/effects/user';

import { getUserData } from 'store/selectors/auth';
import { ValidationSchema, ValidationSchemaLight } from './validation';

import styles from './styles.module.scss';

const ProfileModal = (props) => {
    const { className, isOpen, setIsOpen } = props;
    const dispatch = useDispatch();
    const { role, displayName, email } = useSelector(getUserData);
    const [passwordValue, setPasswordValue] = useState('');
    const [isPending, setIsPending] = useState(false);
    const { translate } = useTranslate();

    const formik = useFormik({
        initialValues: { oldPassword: '', newPassword: '', displayName, role, username: email },
        validationSchema: passwordValue ? ValidationSchema(translate) : ValidationSchemaLight(translate),
        enableReinitialize: true,
        onSubmit(values) {
            setIsPending(true);
            dispatch(updateUserEffect(values, { silent: true }, () => {
                setIsPending(false);
                setIsOpen(false);
                setPasswordValue('');
                formik.resetForm();
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
            className={classNames(styles.profileModal, className)}
            modalContentClassName={styles.modalCardContent}
            cardContentClassName={styles.cardContent}
            title={translate.Profile}
            actionsChildren={(
                <Button
                    onClick={formik.submitForm}
                    title={translate.Save}
                    isPending={isPending}
                    className={styles.saveBtn}
                />
            )}
            cardActionsClassName={styles.modalActions}
        >
            <form className={styles.profileForm} onSubmit={formik.handleSubmit}>
                <Input
                    className={styles.field}
                    name="displayName"
                    label={translate.DisplayName}
                    value={formik?.values?.displayName}
                    onChange={formik.handleChange}
                    error={formik.touched.displayName && formik.errors.displayName}
                />
                <Role
                    className={styles.field}
                    value={formik?.values?.role}
                    onChange={(e, val) => formik.setFieldValue('role', val?.value)}
                    error={formik.touched.role && formik.errors.role}
                    disabled
                />
                <Input
                    name="username"
                    className={styles.field}
                    label={translate.Email}
                    value={formik?.values?.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && formik.errors.username}
                    disabled
                />
                <Input
                    type="password"
                    name="oldPassword"
                    className={styles.field}
                    label={translate.CurrentPassword}
                    onChange={(event, val) => {
                        setPasswordValue(val);
                        formik.handleChange(event);
                        if (!val) {
                            formik.resetForm();
                        }
                    }}
                />
                <Input
                    type="password"
                    name="newPassword"
                    className={styles.field}
                    label={translate.NewPassword}
                    onChange={formik.handleChange}
                    error={formik.touched.newPassword && formik.errors.newPassword}
                />
            </form>
        </Modal>
    );
};

ProfileModal.propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
};

ProfileModal.defaultProps = {
    className: '',
    isOpen: false,
    setIsOpen: () => {},
};

export default ProfileModal;

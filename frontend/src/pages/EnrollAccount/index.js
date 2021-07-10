import React, { useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { enrollAccountEffect, loginEffect } from 'store/effects/auth';
import { useTranslate, useLocationHook } from 'hooks';
import { Input, Button } from 'components/Form';
import { routes } from 'settings/navigation/routes';
import { ValidationSchemaEnroll, ValidationSchemaSuperAdmin } from './validation';

import styles from './styles.module.scss';

const EnrollAccount = () => {
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const { query } = useLocationHook();
    const dispatch = useDispatch();
    const { translate } = useTranslate();

    const formik = useFormik({
        initialValues: { username: '', displayName: '', password: '', confirmPassword: '' },
        validationSchema: query?.token ? ValidationSchemaEnroll(translate) : ValidationSchemaSuperAdmin(translate),
        onSubmit(values) {
            setIsPending(true);
            dispatch(enrollAccountEffect({ ...values, token: query?.token }, {}, (error, response) => {
                if (!error) {
                    if (!response?.data?.user?.email) {
                        history.push(routes.verifyEmail);
                    } else {
                        const config = { username: response?.data?.user?.email, password: values?.password };
                        dispatch(loginEffect(config, {}, (err) => {
                            if (!err) { history.push(routes.index); }
                        }));
                    }
                } else {
                    setIsPending(false);
                }
            }));
        },
    });

    return (
        <div className={styles.formWrapper}>
            <div className={styles.card}>
                <form onSubmit={formik.handleSubmit}>
                    {!query?.token && (
                        <Input
                            name="username"
                            className={styles.field}
                            label={translate.Email}
                            onChange={formik.handleChange}
                            value={formik.values.username}
                            error={formik.touched.username && formik.errors.username}
                            helperText={formik.touched.username ? formik.errors.username : ''}
                        />
                    )}
                    {query?.token && (
                        <>
                            <Input
                                name="displayName"
                                className={styles.field}
                                label={translate.DisplayName}
                                onChange={formik.handleChange}
                                value={formik.values.displayName}
                                error={formik.touched.displayName && formik.errors.displayName}
                                helperText={formik.touched.displayName ? formik.errors.displayName : ''}
                            />
                            <Input
                                type="password"
                                name="password"
                                className={styles.field}
                                label={translate.Password}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={formik.touched.password && formik.errors.password}
                                helperText={formik.touched.password ? formik.errors.password : ''}
                            />
                            <Input
                                type="password"
                                name="confirmPassword"
                                className={styles.field}
                                label={translate.ConfirmPassword}
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                                error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                helperText={formik.touched.confirmPassword ? formik.errors.confirmPassword : ''}
                            />
                        </>
                    )}
                    <Button
                        type="submit"
                        className={classNames(styles.field, styles.submit)}
                        size="large"
                        variant="contained"
                        color="primary"
                        isPending={isPending}
                        title={translate.Submit}
                    />
                </form>
            </div>
        </div>
    );
};

export default EnrollAccount;

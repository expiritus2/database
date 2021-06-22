import React, { useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginEffect } from 'store/effects/auth';
import { useTranslate } from 'hooks';
import { Input, Button } from 'components/Form';
import { ValidationSchema } from './validation';

import styles from './styles.module.scss';
import { routes } from '../../settings/navigation/routes';

const Login = () => {
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const { translate } = useTranslate();

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: ValidationSchema(translate),
        onSubmit(values) {
            setIsPending(true);
            dispatch(loginEffect(values, {}, (err) => {
                if (!err) {
                    history.push(routes.index);
                } else {
                    setIsPending(false);
                }
            }));
        },
    });

    return (
        <div className={styles.formWrapper}>
            <div className={styles.card}>
                <h5 className={styles.title}>
                    {translate.Login}
                </h5>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        name="username"
                        className={styles.field}
                        label={translate.Email}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={formik.touched.username && formik.errors.username}
                        helperText={formik.touched.username ? formik.errors.username : ''}
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

export default Login;

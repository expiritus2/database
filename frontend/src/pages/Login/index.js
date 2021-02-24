import React, { useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { loginEffect } from 'store/effects/auth';
import { useTranslate } from 'hooks';
import { Input, Button } from 'components';
import { ValidationSchema } from './validation';

import styles from './styles.module.scss';

const Login = () => {
    const [isPending, setIsPending] = useState(false);
    const dispatch = useDispatch();
    const { translate } = useTranslate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: ValidationSchema(translate),
        onSubmit(values) {
            setIsPending(true);
            dispatch(loginEffect(values, {}, () => {
                setIsPending(false);
            }));
        },
    });

    return (
        <div className={styles.formWrapper}>
            <Card className={styles.card}>
                <Typography className={styles.title} variant="h5">
                    {translate.Login}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        name="email"
                        className={styles.field}
                        label={translate.Email}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.touched.email && !!formik.errors.email}
                        helperText={formik.touched.email ? formik.errors.email : ''}
                    />
                    <Input
                        type="password"
                        name="password"
                        className={styles.field}
                        label={translate.Password}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.touched.password && !!formik.errors.password}
                        helperText={formik.touched.password ? formik.errors.password : ''}
                    />
                    <Button
                        type="submit"
                        className={classNames(styles.field, styles.submit)}
                        size="large"
                        variant="contained"
                        color="primary"
                        isPending={isPending}
                    >
                        {translate.Submit}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Login;

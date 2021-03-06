import React, { useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { loginEffect } from 'store/effects/auth';
import { useTranslate } from 'hooks';
import { Input, Button } from 'components';
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
            dispatch(loginEffect(values, {}, () => {
                setIsPending(false);
                history.push(routes.index);
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
                        name="username"
                        className={styles.field}
                        label={translate.Email}
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        error={formik.touched.username && !!formik.errors.username}
                        helperText={formik.touched.username ? formik.errors.username : ''}
                        variant="standard"
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
                        variant="standard"
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

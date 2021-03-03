import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { setProfileFormStateAction } from 'store/actions/forms';
import { useTranslate } from 'hooks';
import { Logger } from 'services';
import { Input } from 'components';
import { getApplicantProfileFormStateSelector } from 'store/selectors/forms';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const profileFormState = useSelector(getApplicantProfileFormStateSelector);

    useFormik({
        initialValues: { name: profileFormState?.name },
        enableReinitialize: true,
        onSubmit(values) {
            Logger.log(values);
        },
    });

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setProfileFormStateAction({ [name]: value }));
    };

    return (
        <Input
            name="name"
            className={classNames(className, styles.field)}
            label={translate.FIO}
            onChange={onChangeField}
            value={profileFormState.name}
        />
    );
};

Name.propTypes = {
    className: PropTypes.string,
};

Name.defaultProps = {
    className: '',
};

export default Name;

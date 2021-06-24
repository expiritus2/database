import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { setApplicantFormStateEffect } from 'store/effects/forms/applicant';
import { useTranslate } from 'hooks';
import { Input } from 'components/Form';
import { getApplicantFormSelector } from 'store/selectors/applicantForm';

import styles from './styles.module.scss';

const Name = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { formFields, errors } = useSelector(getApplicantFormSelector);

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setApplicantFormStateEffect({ [name]: value }));
    };

    return (
        <Input
            name="name"
            className={classNames(className, styles.field)}
            label={translate.FIO}
            onChange={onChangeField}
            value={formFields.name}
            error={errors?.name}
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

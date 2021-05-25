import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantFormSelector } from 'store/selectors/applicantForm';

import { AddPhoto, Sex, Phones, Emails, Messengers, Links } from 'components';
import { Input, DatePicker } from 'components/Form-NEW';
import { setApplicantFormStateEffect } from 'store/effects/forms/applicant';
import { FormWrapper } from '../components';
import Name from '../components/Name';

import styles from './styles.module.scss';

const InfoForm = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const modal = useSelector(getModalStateSelector);
    const formFields = useSelector(getApplicantFormSelector);

    const formik = useFormik({
        initialValues: { ...formFields },
        enableReinitialize: true,
    });

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setApplicantFormStateEffect({ [propName]: val }));
    };

    const onChangeField = useCallback((e) => {
        const { name, value } = e.target;
        dispatch(setApplicantFormStateEffect({ [name]: value }));
    }, [dispatch]);

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Name />
                <Input
                    name="nameLat"
                    className={styles.field}
                    label={translate.FIOLat}
                    onChange={onChangeField}
                    value={formFields.nameLat}
                />
                <AddPhoto
                    className={styles.field}
                    onChange={(values) => {
                        onCustomFieldChange(null, values, 'photos');
                    }}
                    value={formik.values.photos}
                />
                <div className={styles.block}>
                    <DatePicker
                        name="birthDate"
                        className={classNames(styles.field, styles.birthDate)}
                        label={translate.BirthDate}
                        onChange={onChangeField}
                        value={formik.values.birthDate}
                    />
                    <Sex
                        name="sex"
                        className={classNames(styles.field, styles.sex)}
                        label={translate.Sex}
                        onChange={onChangeField}
                        value={formik.values.sex}
                    />
                </div>
                <Phones
                    name="phones"
                    className={styles.field}
                    label={translate.Phone}
                    onChange={(val) => onCustomFieldChange(null, val, 'phones')}
                    value={formik.values.phones}
                />
                <Emails
                    name="emails"
                    className={styles.field}
                    label={translate.Emails}
                    onChange={(val) => onCustomFieldChange(null, val, 'emails')}
                    value={formik.values.emails}
                />
                <Messengers
                    name="messengers"
                    className={styles.field}
                    label={translate.Messengers}
                    onChange={(val) => onCustomFieldChange(null, val, 'messengers')}
                    value={formik.values.messengers}
                />
                <Links
                    name="links"
                    className={styles.field}
                    label={translate.Links}
                    onChange={(val) => onCustomFieldChange(null, val, 'links')}
                    value={formik.values.links}
                />
            </form>
        </FormWrapper>
    );
};

InfoForm.propTypes = {
    className: PropTypes.string,
};

InfoForm.defaultProps = {
    className: '',
};

export default InfoForm;

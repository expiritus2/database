import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantFormSelector } from 'store/selectors/applicantForm';

import { Input, DatePicker, Sex, AddFile, Phones, Emails } from 'components';
import { setApplicantFormStateEffect } from 'store/effects/forms/applicant';
import { ContentWrapper } from '../components';
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

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setApplicantFormStateEffect({ [name]: value }));
    };

    return (
        <ContentWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Name />
                <Input
                    name="nameLat"
                    className={styles.field}
                    label={translate.FIOLat}
                    onChange={onChangeField}
                    value={formFields.nameLat}
                />
                <AddFile
                    className={styles.field}
                    onChange={(values) => {
                        onCustomFieldChange(null, values, 'photos');
                    }}
                    value={formFields.photos}
                />
                <div className={styles.block}>
                    <DatePicker
                        name="birthDate"
                        className={classNames(styles.field, styles.birthDate)}
                        label={translate.BirthDate}
                        onChange={onChangeField}
                        defaultDate={formFields.birthDate}
                        value={formFields.birthDate}
                    />
                    <Sex
                        name="sex"
                        className={classNames(styles.field, styles.sex)}
                        label={translate.Sex}
                        onChange={onChangeField}
                        value={formFields.sex}
                    />
                </div>
                <Phones
                    name="phones"
                    className={styles.field}
                    label={translate.Phone}
                    onChange={(val) => onCustomFieldChange(null, val, 'phones')}
                    value={formFields.phones}
                />
                <Emails
                    name="emails"
                    className={styles.field}
                    label={translate.Emails}
                    onChange={(val) => onCustomFieldChange(null, val, 'emails')}
                    value={formFields.emails}
                />
            </form>
        </ContentWrapper>
    );
};

InfoForm.propTypes = {
    className: PropTypes.string,
};

InfoForm.defaultProps = {
    className: '',
};

export default InfoForm;

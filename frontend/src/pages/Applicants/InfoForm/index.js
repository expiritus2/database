import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantInfoFormStateSelector } from 'store/selectors/forms';

import { Input, DatePicker, Sex, AddFile, Phones } from 'components';
import { setInfoFormStateEffect, submitApplicantFormEffect } from 'store/effects/forms';
import { ContentWrapper } from '../components';
import Name from '../components/Name';

import styles from './styles.module.scss';

const InfoForm = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const modal = useSelector(getModalStateSelector);
    const infoFormState = useSelector(getApplicantInfoFormStateSelector);

    const formik = useFormik({
        initialValues: { ...infoFormState },
        enableReinitialize: true,
        onSubmit() {
            dispatch(submitApplicantFormEffect());
        },
    });

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setInfoFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setInfoFormStateEffect({ [name]: value }));
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
                    value={infoFormState.nameLat}
                />
                <AddFile
                    className={styles.field}
                    onChange={(values) => {
                        onCustomFieldChange(null, values, 'photo');
                    }}
                />
                <div className={styles.block}>
                    <DatePicker
                        name="birthDate"
                        className={classNames(styles.field, styles.birthDate)}
                        label={translate.BirthDate}
                        onChange={onChangeField}
                        value={infoFormState.birthDate}
                    />
                    <Sex
                        name="sex"
                        className={classNames(styles.field, styles.sex)}
                        label={translate.Sex}
                        onChange={onChangeField}
                        value={infoFormState.sex}
                    />
                </div>
                <Phones
                    className={styles.field}
                    label={translate.Phones}
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

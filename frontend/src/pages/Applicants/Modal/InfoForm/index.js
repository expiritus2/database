import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantInfoFormStateSelector } from 'store/selectors/forms';

import { Input } from 'components';
import { submitApplicantFormEffect } from 'store/effects/forms';
import { ContentWrapper } from '../components';
import Name from '../Name';

import styles from './styles.module.scss';

const InfoForm = (props) => {
    const { className, onChangeField } = props;
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
            </form>
        </ContentWrapper>
    );
};

InfoForm.propTypes = {
    className: PropTypes.string,
    onChangeField: PropTypes.func.isRequired,
};

InfoForm.defaultProps = {
    className: '',
};

export default InfoForm;

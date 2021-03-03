import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { submitApplicantFormEffect } from 'store/effects/forms';
import { getApplicantExperienceFormStateSelector } from 'store/selectors/forms';

import { ContentWrapper } from '../components';

import Name from '../Name';

import styles from './styles.module.scss';

const ExperienceForm = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const experienceFormState = useSelector(getApplicantExperienceFormStateSelector);

    const formik = useFormik({
        initialValues: { ...experienceFormState },
        enableReinitialize: true,
        onSubmit() {
            dispatch(submitApplicantFormEffect());
        },
    });

    return (
        <ContentWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Name />
            </form>
        </ContentWrapper>
    );
};

ExperienceForm.propTypes = {
    className: PropTypes.string,
};

ExperienceForm.defaultProps = {
    className: '',
};

export default ExperienceForm;

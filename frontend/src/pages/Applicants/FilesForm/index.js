import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { submitApplicantFormEffect } from 'store/effects/forms';
import { getApplicantFilesFormStateSelector } from 'store/selectors/forms';

import Name from '../components/Name';
import { ContentWrapper } from '../components';

import styles from './styles.module.scss';

const FilesForm = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const filesFormState = useSelector(getApplicantFilesFormStateSelector);

    const formik = useFormik({
        initialValues: { ...filesFormState },
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

FilesForm.propTypes = {
    className: PropTypes.string,
};

FilesForm.defaultProps = {
    className: '',
};

export default FilesForm;

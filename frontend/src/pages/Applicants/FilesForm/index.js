import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AddFiles } from 'components';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { setApplicantFormStateEffect } from 'store/effects/forms/applicant';
import { getApplicantFilesFormStateSelector } from 'store/selectors/applicantForm';

import Name from '../components/Name';
import { FormWrapper } from '../components';

import styles from './styles.module.scss';

const FilesForm = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const filesFormState = useSelector(getApplicantFilesFormStateSelector);

    const formik = useFormik({
        initialValues: { files: filesFormState },
        enableReinitialize: true,
    });

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setApplicantFormStateEffect({ [propName]: val }));
    };

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Name />
                <AddFiles
                    className={styles.field}
                    onChange={(values) => {
                        onCustomFieldChange(null, values, 'files');
                    }}
                    value={filesFormState}
                />
            </form>
        </FormWrapper>
    );
};

FilesForm.propTypes = {
    className: PropTypes.string,
};

FilesForm.defaultProps = {
    className: '',
};

export default FilesForm;

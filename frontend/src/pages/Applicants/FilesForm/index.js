import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AddFile } from 'components';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { setFilesFormStateEffect, submitApplicantFormEffect } from 'store/effects/forms';
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

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setFilesFormStateEffect({ [propName]: val }));
    };

    // const onChangeField = (e) => {
    //     const { name, value } = e.target;
    //     dispatch(setFilesFormStateEffect({ [name]: value }));
    // };

    return (
        <ContentWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Name />
                <AddFile
                    className={styles.field}
                    variant={AddFile.file}
                    onChange={(values) => {
                        onCustomFieldChange(null, values, 'files');
                    }}
                    value={filesFormState.files}
                />
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

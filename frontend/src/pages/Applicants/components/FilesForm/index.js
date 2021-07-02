import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { AddFiles } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { setApplicantFormStateEffect } from 'store/effects/forms/applicant';
import { getApplicantFormSelector } from 'store/selectors/applicantForm';

import { FormWrapper, Name } from '..';

import styles from './styles.module.scss';

const FilesForm = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const { formFields } = useSelector(getApplicantFormSelector);

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setApplicantFormStateEffect({ [propName]: val }));
    };

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id}>
                <Name />
                <AddFiles
                    id="applicantFiles"
                    className={styles.field}
                    onChange={(files, values) => {
                        onCustomFieldChange(null, values, 'files');
                    }}
                    value={formFields.files}
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

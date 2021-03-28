import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import { Input, Checkbox, Education, Position, Skills, Textarea, NumberInput, Place, Languages, Regions, SalaryInput } from 'components';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantFormSelector } from 'store/selectors/applicantForm';
import { setApplicantFormStateEffect } from 'store/effects/forms/applicant';
import { FormWrapper } from '../components';
import Name from '../components/Name';

import styles from './styles.module.scss';

const ProfileForm = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
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
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Name />
                <FormControlLabel
                    className={classNames(styles.field, styles.inActiveSearch)}
                    control={<Checkbox onChange={(e, val) => onCustomFieldChange(e, val, 'inActiveSearch')} checked={formik.values.inActiveSearch} />}
                    label={translate.InActiveSearch}
                />
                <NumberInput
                    name="experienceYears"
                    className={styles.field}
                    label={translate.ExperienceYears}
                    onValueChange={(values) => onCustomFieldChange(null, values?.floatValue, 'experienceYears')}
                    value={formFields.experienceYears}
                />
                <SalaryInput
                    className={styles.field}
                    onChange={(values) => {
                        onCustomFieldChange(null, { ...formFields.salary, amount: values?.floatValue }, 'salary');
                    }}
                    onCurrencyChange={(e) => onCustomFieldChange(null, { ...formFields.salary, currency: e.target.value }, 'salary')}
                    value={formFields?.salary}
                />
                <Education
                    name="education"
                    className={styles.field}
                    onChange={onChangeField}
                    value={formFields.education}
                />
                <Position
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'positions')}
                    value={formFields.positions}
                />
                <Skills
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'skills')}
                    value={formFields.skills}
                />
                <Place
                    className={styles.field}
                    label={translate.Place}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'place')}
                    value={formFields.place}
                />
                <Regions
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'regions')}
                    value={formFields.regions}
                />
                <Input
                    name="address"
                    className={styles.field}
                    label={translate.Address}
                    onChange={onChangeField}
                    value={formFields.address}
                />
                <Languages
                    name="languages"
                    className={styles.field}
                    label={translate.Languages}
                    onChange={(val) => onCustomFieldChange(null, val, 'languages')}
                    value={formFields.languages}
                />
                <Textarea
                    name="info"
                    className={styles.field}
                    label={translate.Info}
                    onChange={onChangeField}
                    value={formFields.info}
                />
            </form>
        </FormWrapper>
    );
};

ProfileForm.propTypes = {
    className: PropTypes.string,
};

ProfileForm.defaultProps = {
    className: '',
};

export default ProfileForm;

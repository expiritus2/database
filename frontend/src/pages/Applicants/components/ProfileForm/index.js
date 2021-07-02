import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Checkbox, Input } from 'components/Form';
import { Education, Positions, Skills, WorkPlaces, Languages, Regions, SalaryInput, InfoInput } from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantFormSelector } from 'store/selectors/applicantForm';
import { setApplicantFormStateEffect } from 'store/effects/forms/applicant';
import { FormWrapper, Name } from '..';

import styles from './styles.module.scss';

const ProfileForm = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const { formFields, errors } = useSelector(getApplicantFormSelector);

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setApplicantFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setApplicantFormStateEffect({ [name]: value }));
    };

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id}>
                <Name />
                <Checkbox
                    direction={Checkbox.DIRECTION_RIGHT}
                    className={classNames(styles.field, styles.inActiveSearch)}
                    labelTextClassName={styles.inActiveSearchText}
                    label={translate.InActiveSearch}
                    onChange={(e, val, isChecked) => onCustomFieldChange(e, isChecked, 'inActiveSearch')}
                    checked={formFields.inActiveSearch}
                />
                <Input
                    minNumber={0}
                    isNumberFormat
                    name="experienceYears"
                    className={styles.field}
                    label={translate.ExperienceYears}
                    onChange={(e, val) => {
                        onCustomFieldChange(null, val, 'experienceYears');
                    }}
                    value={formFields.experienceYears}
                    interval={0.5}
                />
                <SalaryInput
                    className={styles.field}
                    onChange={(e, val) => {
                        onCustomFieldChange(null, { ...formFields.salary, amount: val }, 'salary');
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
                <Positions
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'positions')}
                    value={formFields.positions}
                    error={errors.positions}
                />
                <Skills
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'skills')}
                    value={formFields.skills}
                    error={errors.skills}
                />
                <WorkPlaces
                    className={styles.field}
                    label={translate.Place}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'workPlaces')}
                    value={formFields.workPlaces}
                />
                <Regions
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'regions')}
                    value={formFields.regions}
                    error={errors.regions}
                />
                <Input
                    name="address"
                    className={styles.field}
                    label={translate.Address}
                    onChange={onChangeField}
                    value={formFields.address || ''}
                />
                <Languages
                    name="languageSkills"
                    className={styles.field}
                    label={translate.Languages}
                    onChange={(val) => onCustomFieldChange(null, val, 'languageSkills')}
                    value={formFields.languageSkills}
                />
                <InfoInput
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
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Checkbox, Input } from 'components/Form';
import {
    Company,
    Recruiters,
    Contacts,
    SalaryRange,
    Skills,
    WorkPlaces,
    WorkSchedules,
    WorkTypes,
    Regions,
    VacancyName,
    InfoInput,
} from 'components';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getVacancyFormSelector } from 'store/selectors/vacancyForm';
import { setVacancyFormStateEffect } from 'store/effects/forms/vacancy';
import { FormWrapper } from '../components';

import styles from './styles.module.scss';

const ProfileForm = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const { formFields, errors } = useSelector(getVacancyFormSelector);

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setVacancyFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setVacancyFormStateEffect({ [name]: value }));
    };

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id}>
                <Checkbox
                    direction={Checkbox.DIRECTION_RIGHT}
                    className={classNames(styles.field, styles.activeSearch)}
                    labelTextClassName={styles.activeSearchText}
                    label={translate.Actives}
                    onChange={(e, val, isChecked) => onCustomFieldChange(e, isChecked, 'active')}
                    checked={formFields.active}
                />
                <VacancyName
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'position')}
                    value={formFields.position}
                    error={errors?.position}
                />
                <Recruiters
                    name="users"
                    className={classNames(className, styles.field)}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'users')}
                    value={formFields.users}
                />
                <Company
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'company')}
                    value={formFields.company}
                />
                <Contacts
                    name="contacts"
                    className={classNames(className, styles.field)}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'contacts')}
                    value={formFields.contacts}
                />
                <SalaryRange
                    className={styles.field}
                    onChangeMin={(e, value) => {
                        onCustomFieldChange(null, { ...formFields.salaryRange, min: value }, 'salaryRange');
                    }}
                    onChangeMax={(e, value) => {
                        onCustomFieldChange(null, { ...formFields.salaryRange, max: value }, 'salaryRange');
                    }}
                    onCurrencyChange={(e) => onCustomFieldChange(null, { ...formFields.salaryRange, currency: e.target.value }, 'salaryRange')}
                    value={formFields?.salaryRange}
                />
                <Input
                    isNumberFormat
                    minNumber={0}
                    name="experienceYears"
                    className={styles.field}
                    label={translate.ExperienceYears}
                    onChange={(e, numberValue) => onCustomFieldChange(null, numberValue, 'experienceYears')}
                    value={formFields.experienceYears}
                    interval={0.5}
                />
                <Skills
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'skills')}
                    value={formFields.skills}
                    error={errors?.skills}
                />
                <WorkPlaces
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'workPlaces')}
                    value={formFields.workPlaces}
                />
                <WorkSchedules
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'workSchedules')}
                    value={formFields.workSchedules}
                />
                <WorkTypes
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'workTypes')}
                    value={formFields.workTypes}
                />
                <Regions
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'regions')}
                    value={formFields.regions}
                    error={errors?.regions}
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

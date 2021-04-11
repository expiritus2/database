import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import {
    Input,
    Checkbox,
    Company,
    Position,
    SalaryInput,
    NumberInput, Skills, Place, Regions, Textarea,
} from 'components';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getVacancyFormSelector } from 'store/selectors/vacancyForm';
import { setVacancyFormStateEffect } from 'store/effects/forms/vacancy';
import { FormWrapper } from '../componets';

import styles from './styles.module.scss';

const ProfileForm = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const formFields = useSelector(getVacancyFormSelector);

    const formik = useFormik({
        initialValues: { ...formFields },
        enableReinitialize: true,
    });

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setVacancyFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setVacancyFormStateEffect({ [name]: value }));
    };

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <FormControlLabel
                    className={classNames(styles.field, styles.active)}
                    control={<Checkbox onChange={(e, val) => onCustomFieldChange(e, val, 'active')} checked={formik.values.active} />}
                    label={translate.Actives}
                />
                <Position
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'positions')}
                    value={formik.values.positions}
                />
                <Input
                    name="recruiters"
                    className={classNames(className, styles.field)}
                    label={translate.Recruiters}
                    onChange={onChangeField}
                    value={formik.values.recruiters}
                />
                <Company
                    name="company"
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'company')}
                    value={formik.values.company}
                />
                <SalaryInput
                    className={styles.field}
                    onChange={(values) => {
                        onCustomFieldChange(null, { ...formFields.salary, amount: values?.floatValue }, 'salary');
                    }}
                    onCurrencyChange={(e) => onCustomFieldChange(null, { ...formFields.salary, currency: e.target.value }, 'salary')}
                    value={formFields?.salary}
                />
                <NumberInput
                    name="experienceYears"
                    className={styles.field}
                    label={translate.ExperienceYears}
                    onValueChange={(values) => onCustomFieldChange(null, values?.floatValue, 'experienceYears')}
                    value={formFields.experienceYears}
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
                <Input
                    name="workSchedule"
                    className={classNames(className, styles.field)}
                    label={translate.WorkSchedule}
                    onChange={onChangeField}
                    value={formik.values.workSchedule}
                />
                <Input
                    name="type"
                    className={classNames(className, styles.field)}
                    label={translate.Type}
                    onChange={onChangeField}
                    value={formik.values.type}
                />
                <Regions
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'regions')}
                    value={formFields.regions}
                />
                <Input
                    name="test"
                    className={classNames(className, styles.field)}
                    label={translate.Test}
                    onChange={onChangeField}
                    value={formik.values.test}
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

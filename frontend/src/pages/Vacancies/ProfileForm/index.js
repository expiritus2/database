import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import {
    Checkbox,
    Company,
    Position,
    Recruiters,
    Contacts,
    SalaryMinMax,
    NumberInput,
    Skills,
    Place,
    WorkSchedule,
    Regions,
    File,
    Textarea, Input,
} from 'components';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
                    control={<Checkbox onChange={(e, val) => onCustomFieldChange(e, val, 'active')} checked={formFields.active} />}
                    label={translate.Actives}
                />
                <Position
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'positions')}
                    value={formFields.positions}
                />
                <Recruiters
                    name="recruiters"
                    className={classNames(className, styles.field)}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'recruiters')}
                    value={formFields.recruiters}
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
                <SalaryMinMax
                    className={styles.field}
                    onChangeMin={(value) => {
                        onCustomFieldChange(null, { ...formFields.salary, min: value }, 'salary');
                    }}
                    onChangeMax={(value) => {
                        onCustomFieldChange(null, { ...formFields.salary, max: value }, 'salary');
                    }}
                    onCurrencyChange={(e) => onCustomFieldChange(null, { ...formFields.salary, currency: e.target.value }, 'salary')}
                    value={formFields?.salary}
                />
                <NumberInput
                    name="experienceYears"
                    className={styles.field}
                    label={translate.ExperienceYears}
                    onChange={(numberValue) => onCustomFieldChange(null, numberValue, 'experienceYears')}
                    value={formFields.experienceYears}
                    interval={0.5}
                />
                <Skills
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'skills')}
                    value={formFields.skills}
                />
                <Place
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'place')}
                    value={formFields.place}
                />
                <WorkSchedule
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'workSchedule')}
                    value={formFields.workSchedule}
                />
                <Regions
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'regions')}
                    value={formFields.regions}
                />
                <File
                    id="test"
                    label={translate.Test}
                    onChange={(newFile) => onCustomFieldChange(null, newFile, 'test')}
                    value={formFields.test}
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

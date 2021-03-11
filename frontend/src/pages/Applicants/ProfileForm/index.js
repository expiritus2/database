import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import { Input, Checkbox, Education, Position, Skills, Textarea, Currency, NumberInput, Place, Languages } from 'components';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantProfileFormStateSelector } from 'store/selectors/forms';
import { setProfileFormStateEffect, submitApplicantFormEffect } from 'store/effects/forms';
import { ContentWrapper } from '../components';
import Name from '../components/Name';

import styles from './styles.module.scss';

const ProfileForm = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const profileFormState = useSelector(getApplicantProfileFormStateSelector);

    const formik = useFormik({
        initialValues: { ...profileFormState },
        enableReinitialize: true,
        onSubmit() {
            dispatch(submitApplicantFormEffect());
        },
    });

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setProfileFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setProfileFormStateEffect({ [name]: value }));
    };

    return (
        <ContentWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Name />
                <FormControlLabel
                    className={classNames(styles.field, styles.inActiveSearch)}
                    control={<Checkbox onChange={(e, val) => onCustomFieldChange(e, val, 'inActiveSearch')} checked={formik.values.inActiveSearch} />}
                    label={translate.InActiveSearch}
                />
                <Input
                    name="experience"
                    type="number"
                    className={styles.field}
                    label={translate.Experience}
                    onChange={onChangeField}
                    value={profileFormState.experience}
                />
                <FormControl className={classNames(styles.field, styles.formControl)}>
                    <NumberInput
                        name="salary"
                        className={classNames(styles.salary)}
                        label={translate.Salary}
                        onValueChange={(values) => onCustomFieldChange(null, values?.floatValue, 'salary')}
                        value={profileFormState.salary}
                    />
                    <Currency
                        name="currency"
                        className={styles.currency}
                        onChange={onChangeField}
                        value={profileFormState.currency}
                    />
                </FormControl>
                <Education
                    name="education"
                    className={styles.field}
                    onChange={onChangeField}
                    value={profileFormState.education}
                />
                <Position
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'position')}
                    value={profileFormState.position}
                />
                <Skills
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'skills')}
                    value={profileFormState.skills}
                />
                <Place
                    className={styles.field}
                    label={translate.Place}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'place')}
                    value={profileFormState.place}
                />
                <Input
                    name="regions"
                    className={styles.field}
                    label={translate.Regions}
                    onChange={onChangeField}
                    value={profileFormState.regions}
                />
                <Input
                    name="address"
                    className={styles.field}
                    label={translate.Address}
                    onChange={onChangeField}
                    value={profileFormState.address}
                />
                <Languages
                    name="languages"
                    className={styles.field}
                    label={translate.Languages}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'languages')}
                    value={profileFormState.languages}
                />
                <Textarea
                    name="info"
                    className={styles.field}
                    label={translate.Info}
                    onChange={onChangeField}
                    value={profileFormState.info}
                />
            </form>
        </ContentWrapper>
    );
};

ProfileForm.propTypes = {
    className: PropTypes.string,
};

ProfileForm.defaultProps = {
    className: '',
};

export default ProfileForm;

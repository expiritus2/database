import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { openApplicantSearchDrawerEffect, setApplicantSearchFieldsEffect } from 'store/effects/drawers';
import { getApplicantSearchDrawerSelector } from 'store/selectors/drawers';
import {
    Drawer, Education, Emails, Languages, Links, Messengers, Phones,
    Positions, Regions, SalaryInput, Skills, WorkPlaces,
} from 'components';
import { useTranslate } from 'hooks';
import { Checkbox, Input } from 'components/Form';

import styles from './styles.module.scss';

const ApplicantSearchDrawer = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { open, formFields } = useSelector(getApplicantSearchDrawerSelector);

    const onClose = () => {
        dispatch(openApplicantSearchDrawerEffect({ open: false }));
    };

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setApplicantSearchFieldsEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setApplicantSearchFieldsEffect({ [name]: value }));
    };

    return (
        <Drawer
            isOpen={open}
            onClose={onClose}
            className={classNames(styles.applicantSearchDrawer, className)}
        >
            <div className={styles.contentWrapper}>
                <form>
                    <Input
                        name="name"
                        className={classNames(className, styles.field)}
                        label={translate.FIO}
                        onChange={onChangeField}
                        value={formFields.name}
                    />
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
                        onCurrencyChange={(e) => {
                            onCustomFieldChange(null, { ...formFields.salary, currency: e.target.value }, 'salary');
                        }}
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
                    />
                    <Skills
                        className={styles.field}
                        onChange={(e, val) => onCustomFieldChange(e, val, 'skills')}
                        value={formFields.skills}
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
                    />
                    <Languages
                        name="languageSkills"
                        className={styles.field}
                        label={translate.Languages}
                        onChange={(val) => onCustomFieldChange(null, val, 'languageSkills')}
                        value={formFields.languageSkills}
                    />
                    <Phones
                        name="phones"
                        className={styles.field}
                        label={translate.Phone}
                        onChange={(val) => onCustomFieldChange(null, val, 'phones')}
                        value={formFields.phones}
                    />
                    <Emails
                        name="emails"
                        className={styles.field}
                        label={translate.Emails}
                        onChange={(val) => onCustomFieldChange(null, val, 'emails')}
                        value={formFields.emails}
                    />
                    <Messengers
                        name="messengers"
                        className={styles.field}
                        label={translate.Messengers}
                        onChange={(val) => onCustomFieldChange(null, val, 'messengers')}
                        value={formFields.messengers}
                    />
                    <Links
                        name="links"
                        className={styles.field}
                        label={translate.Links}
                        onChange={(val) => onCustomFieldChange(null, val, 'links')}
                        value={formFields.links}
                        menuTop
                    />
                </form>
            </div>
        </Drawer>
    );
};

ApplicantSearchDrawer.propTypes = {
    className: PropTypes.string,
};

ApplicantSearchDrawer.defaultProps = {
    className: '',
};

export default ApplicantSearchDrawer;

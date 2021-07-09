import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import {
    openVacancySearchDrawerEffect,
    resetVacancySearchFieldsEffect,
    setVacancySearchFieldsEffect,
} from 'store/effects/drawers';
import { resetVacancyEffect, getVacanciesEffect, setVacanciesSearchEffect } from 'store/effects/vacancies';
import { getVacancySearchDrawerSelector } from 'store/selectors/drawers';
import {
    Drawer,
    Regions,
    Skills,
    WorkPlaces,
    SalaryRange,
    VacancyName,
    Recruiters,
    Company,
    Contacts,
    WorkSchedules,
    WorkTypes,
    ExperienceRange,
    DateRange,
} from 'components';
import { useTranslate } from 'hooks';
import { Checkbox, Input } from 'components/Form';
import Footer from './Footer';

import styles from './styles.module.scss';

const VacancySearchDrawer = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { open, formFields } = useSelector(getVacancySearchDrawerSelector);

    const onClose = () => {
        dispatch(openVacancySearchDrawerEffect({ open: false }));
    };

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setVacancySearchFieldsEffect({ [propName]: val }));
    };

    const onReset = () => {
        dispatch(resetVacancySearchFieldsEffect());
        dispatch(resetVacancyEffect());
        dispatch(getVacanciesEffect());
    };

    const onSearch = () => {
        dispatch(resetVacancyEffect());
        dispatch(getVacanciesEffect());
        dispatch(openVacancySearchDrawerEffect({ open: false }));
        dispatch(setVacanciesSearchEffect({ active: formFields?.active }));
    };

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <Drawer
            isOpen={open}
            onClose={onClose}
            className={classNames(styles.vacancySearchDrawer, className)}
        >
            <div className={styles.wrapper}>
                <div className={styles.contentWrapper}>
                    <form>
                        <Checkbox
                            direction={Checkbox.DIRECTION_RIGHT}
                            className={classNames(styles.field, styles.active)}
                            labelTextClassName={styles.activeSerchText}
                            label={translate.Active}
                            onChange={(e, val, isChecked) => onCustomFieldChange(e, isChecked, 'active')}
                            checked={formFields.active}
                        />
                        <Input
                            minNumber={0}
                            thousandSeparator={false}
                            isNumberFormat
                            name="id"
                            className={classNames(styles.field, styles.id)}
                            label="#"
                            onChange={(e, val) => onCustomFieldChange(null, val, 'id')}
                            onKeyPress={onKeyPress}
                            value={formFields.id}
                            interval={1}
                        />
                        <VacancyName
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'position')}
                            value={formFields.position}
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
                            onChange={(e, val) => onCustomFieldChange(e, val, 'salaryRange')}
                            value={formFields?.salaryRange}
                        />
                        <ExperienceRange
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(null, val, 'experienceRange')}
                            value={formFields?.experienceRange}
                        />
                        <Skills
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'skills')}
                            value={formFields.skills}
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
                        />
                        <DateRange
                            name="updatedAt"
                            label={translate.UpdatedAt}
                            className={styles.field}
                            onChange={(event, val) => onCustomFieldChange(event, val, 'updatedAt')}
                            value={formFields?.updatedAt}
                        />
                        <DateRange
                            name="createdAt"
                            label={translate.CreatedAt}
                            className={styles.field}
                            onChange={(event, val) => onCustomFieldChange(event, val, 'createdAt')}
                            value={formFields?.createdAt}
                        />
                    </form>
                </div>
                <Footer onReset={onReset} onSearch={onSearch} />
            </div>
        </Drawer>
    );
};

VacancySearchDrawer.propTypes = {
    className: PropTypes.string,
};

VacancySearchDrawer.defaultProps = {
    className: '',
};

export default VacancySearchDrawer;

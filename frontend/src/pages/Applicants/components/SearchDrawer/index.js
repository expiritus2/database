import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import {
    openApplicantSearchDrawerEffect,
    resetApplicantSearchFieldsEffect,
    setApplicantSearchFieldsEffect,
} from 'store/effects/drawers';
import { resetApplicantEffect, getApplicantsEffect, setApplicantsSearchEffect } from 'store/effects/applicants';
import { getApplicantSearchDrawerSelector } from 'store/selectors/drawers';
import {
    Drawer, Language, Positions, Regions, Sex,
    Skills, WorkPlaces, AgeRange, SalaryRange,
    Phone, Email, DateRange, Messenger, Link, ExperienceRange,
} from 'components';
import { useTranslate } from 'hooks';
import { Checkbox, Input } from 'components/Form';
import Footer from './Footer';

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

    const onReset = () => {
        dispatch(resetApplicantSearchFieldsEffect());
        dispatch(resetApplicantEffect());
        dispatch(getApplicantsEffect());
    };

    const onSearch = () => {
        dispatch(resetApplicantEffect());
        dispatch(getApplicantsEffect());
        dispatch(openApplicantSearchDrawerEffect({ open: false }));
        dispatch(setApplicantsSearchEffect({ string: formFields?.name, active: formFields?.inActiveSearch }));
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
            className={classNames(styles.applicantSearchDrawer, className)}
        >
            <div className={styles.wrapper}>
                <div className={styles.contentWrapper}>
                    <form>
                        <Checkbox
                            direction={Checkbox.DIRECTION_RIGHT}
                            className={classNames(styles.field, styles.inActiveSearch)}
                            labelTextClassName={styles.inActiveSearchText}
                            label={translate.Active}
                            onChange={(e, val, isChecked) => onCustomFieldChange(e, isChecked, 'inActiveSearch')}
                            checked={formFields.inActiveSearch}
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
                        <Input
                            name="name"
                            className={classNames(className, styles.field)}
                            label={translate.FIO}
                            onChange={onChangeField}
                            onKeyPress={onKeyPress}
                            value={formFields.name}
                        />
                        <Input
                            name="nameLat"
                            className={styles.field}
                            label={translate.FIOLat}
                            onChange={onChangeField}
                            onKeyPress={onKeyPress}
                            value={formFields.nameLat}
                        />
                        <Sex
                            name="sex"
                            className={classNames(styles.field)}
                            label={translate.Sex}
                            onChange={onChangeField}
                            value={formFields.sex}
                        />
                        <AgeRange
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'ageRange')}
                            value={formFields?.ageRange}
                        />
                        <SalaryRange
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'salaryRange')}
                            value={formFields?.salaryRange}
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
                        <Regions
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'regions')}
                            value={formFields.regions}
                        />
                        <WorkPlaces
                            className={styles.field}
                            label={translate.Place}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'workPlaces')}
                            value={formFields.workPlaces}
                        />
                        <ExperienceRange
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(null, val, 'experienceRange')}
                            value={formFields?.experienceRange}
                        />
                        <Language
                            name="languageSkill"
                            className={styles.field}
                            label={translate.Languages}
                            onChange={(event, val) => onCustomFieldChange(event, val, 'languageSkill')}
                            value={formFields.languageSkill}
                        />
                        <Phone
                            name="phone"
                            className={styles.field}
                            label={translate.Phone}
                            onChange={(event, val) => onCustomFieldChange(event, val, 'phone')}
                            value={formFields.phone}
                        />
                        <Email
                            name="email"
                            className={styles.field}
                            label={translate.Email}
                            onChange={(event, val) => onCustomFieldChange(null, val, 'email')}
                            value={formFields.email}
                        />
                        <Messenger
                            name="messenger"
                            className={styles.field}
                            label={translate.Messenger}
                            onChange={(event, val) => onCustomFieldChange(null, val, 'messenger')}
                            value={formFields.messenger}
                        />
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            name="link"
                            className={styles.field}
                            label={translate.Link}
                            onChange={(event, val) => onCustomFieldChange(null, val, 'link')}
                            value={formFields.link}
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

ApplicantSearchDrawer.propTypes = {
    className: PropTypes.string,
};

ApplicantSearchDrawer.defaultProps = {
    className: '',
};

export default ApplicantSearchDrawer;

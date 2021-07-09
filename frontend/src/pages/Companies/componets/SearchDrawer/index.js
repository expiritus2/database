import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { openCompanySearchDrawerEffect, resetCompanySearchFieldsEffect, setCompanySearchFieldsEffect } from 'store/effects/drawers';
import { resetCompanyEffect, getCompaniesEffect, setCompaniesSearchEffect } from 'store/effects/companies';
import { getCompanySearchDrawerSelector } from 'store/selectors/drawers';
import { Drawer, Regions, Recruiters, Activities, Link, DateRange } from 'components';
import { useTranslate } from 'hooks';
import { Checkbox, Input } from 'components/Form';
import Footer from './Footer';

import styles from './styles.module.scss';

const CompanySearchDrawer = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { open, formFields } = useSelector(getCompanySearchDrawerSelector);

    const onClose = () => {
        dispatch(openCompanySearchDrawerEffect({ open: false }));
    };

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setCompanySearchFieldsEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setCompanySearchFieldsEffect({ [name]: value }));
    };

    const onReset = () => {
        dispatch(resetCompanySearchFieldsEffect());
        dispatch(resetCompanyEffect());
        dispatch(getCompaniesEffect());
    };

    const onSearch = () => {
        dispatch(resetCompanyEffect());
        dispatch(getCompaniesEffect());
        dispatch(openCompanySearchDrawerEffect({ open: false }));
        dispatch(setCompaniesSearchEffect({ string: formFields?.name, active: formFields?.active }));
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
                            className={classNames(styles.field, styles.active)}
                            labelTextClassName={styles.activeText}
                            label={translate.SheActive}
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
                        <Input
                            name="name"
                            className={classNames(className, styles.field)}
                            label={translate.Calling}
                            onChange={onChangeField}
                            value={formFields.name}
                            onKeyPress={onKeyPress}
                        />
                        <Recruiters
                            name="users"
                            className={classNames(className, styles.field)}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'users')}
                            value={formFields.users}
                        />
                        <Activities
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'activities')}
                            value={formFields.activities}
                        />
                        <Regions
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'regions')}
                            value={formFields.regions}
                        />
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <Link
                            name="link"
                            className={styles.field}
                            label={translate.Links}
                            onChange={(event, val) => onCustomFieldChange(event, val, 'link')}
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

CompanySearchDrawer.propTypes = {
    className: PropTypes.string,
};

CompanySearchDrawer.defaultProps = {
    className: '',
};

export default CompanySearchDrawer;

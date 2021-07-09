import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import {
    openContactSearchDrawerEffect,
    resetContactSearchFieldsEffect,
    setContactSearchFieldsEffect,
} from 'store/effects/drawers';
import { resetContactEffect, getContactsEffect, setContactsSearchEffect } from 'store/effects/contacts';
import { getContactSearchDrawerSelector } from 'store/selectors/drawers';
import {
    Drawer, Company, DateRange,
    Positions, Sex, Phone, Email,
} from 'components';
import { useTranslate } from 'hooks';
import { Checkbox, Input } from 'components/Form';
import Footer from './Footer';

import styles from './styles.module.scss';

const ContactSearchDrawer = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { open, formFields } = useSelector(getContactSearchDrawerSelector);

    const onClose = () => {
        dispatch(openContactSearchDrawerEffect({ open: false }));
    };

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setContactSearchFieldsEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setContactSearchFieldsEffect({ [name]: value }));
    };

    const onReset = () => {
        dispatch(resetContactSearchFieldsEffect());
        dispatch(resetContactEffect());
        dispatch(getContactsEffect());
    };

    const onSearch = () => {
        dispatch(resetContactEffect());
        dispatch(getContactsEffect());
        dispatch(openContactSearchDrawerEffect({ open: false }));
        dispatch(setContactsSearchEffect({ active: formFields?.active }));
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
            className={classNames(styles.contactSearchDrawer, className)}
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
                            label={translate.Name}
                            onChange={onChangeField}
                            value={formFields.name}
                        />
                        <Company
                            name="company"
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'company')}
                            value={formFields.company}
                        />
                        <Positions
                            className={styles.field}
                            onChange={(e, val) => onCustomFieldChange(e, val, 'positions')}
                            value={formFields.positions}
                        />
                        <Sex
                            name="sex"
                            className={classNames(styles.field)}
                            label={translate.Sex}
                            onChange={onChangeField}
                            value={formFields.sex}
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

ContactSearchDrawer.propTypes = {
    className: PropTypes.string,
};

ContactSearchDrawer.defaultProps = {
    className: '',
};

export default ContactSearchDrawer;

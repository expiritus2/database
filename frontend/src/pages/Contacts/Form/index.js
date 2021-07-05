import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Company, Positions, AddPhoto, Sex, Phones, Emails } from 'components';
import { Input, DatePicker, Checkbox } from 'components/Form';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getContactFormSelector } from 'store/selectors/contactForm';
import { setContactFormStateEffect } from 'store/effects/forms/contact';
import { FormWrapper } from '../componets';

import styles from './styles.module.scss';

const Form = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const { formFields, errors } = useSelector(getContactFormSelector);

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setContactFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setContactFormStateEffect({ [name]: value }));
    };

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id}>
                <Checkbox
                    direction={Checkbox.DIRECTION_RIGHT}
                    className={classNames(styles.field, styles.active)}
                    labelTextClassName={styles.activeText}
                    label={translate.SheActive}
                    onChange={(e, val, isChecked) => onCustomFieldChange(e, isChecked, 'active')}
                    checked={formFields.active}
                />
                <Input
                    name="name"
                    className={classNames(className, styles.field)}
                    label={translate.Name}
                    onChange={onChangeField}
                    value={formFields.name}
                    error={errors.name}
                />
                <Company
                    name="company"
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'company')}
                    value={formFields.company}
                    error={errors.company}
                />
                <Positions
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'positions')}
                    value={formFields.positions}
                    error={errors.positions}
                />
                <AddPhoto
                    id="contactPhotos"
                    className={styles.field}
                    onChange={(files, values) => {
                        onCustomFieldChange(null, values, 'photos');
                    }}
                    value={formFields.photos}
                />
                <div className={styles.block}>
                    <DatePicker
                        name="birthDate"
                        className={classNames(styles.field, styles.birthDate)}
                        label={translate.BirthDate}
                        onChange={onChangeField}
                        value={formFields.birthDate}
                        options={{ enableTime: false }}
                    />
                    <Sex
                        name="sex"
                        className={classNames(styles.field, styles.sex)}
                        label={translate.Sex}
                        onChange={onChangeField}
                        value={formFields.sex}
                    />
                </div>
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
                    onChange={(event, val) => onCustomFieldChange(null, val, 'emails')}
                    value={formFields.emails}
                />
            </form>
        </FormWrapper>
    );
};

Form.propTypes = {
    className: PropTypes.string,
};

Form.defaultProps = {
    className: '',
};

export default Form;

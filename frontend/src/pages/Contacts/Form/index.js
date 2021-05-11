import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import { Input, Company, Position, AddPhoto, DatePicker, Sex, Phones, Emails } from 'components';

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
    const formFields = useSelector(getContactFormSelector);

    const formik = useFormik({
        initialValues: { ...formFields },
        enableReinitialize: true,
    });

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setContactFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setContactFormStateEffect({ [name]: value }));
    };

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                {/* <FormControlLabel */}
                {/*    className={classNames(styles.field, styles.active)} */}
                {/*    control={<Checkbox onChange={(e, val) => onCustomFieldChange(e, val, 'active')} checked={formik.values.active} />} */}
                {/*    label={translate.Actives} */}
                {/* /> */}
                <Input
                    name="name"
                    className={classNames(className, styles.field)}
                    label={translate.Name}
                    onChange={onChangeField}
                    value={formik.values.name}
                />
                <Company
                    name="company"
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'company')}
                    value={formik.values.company}
                />
                <Position
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'positions')}
                    value={formik.values.positions}
                />
                <AddPhoto
                    className={styles.field}
                    onChange={(values) => {
                        onCustomFieldChange(null, values, 'photos');
                    }}
                    value={formik.values.photos.map((photo) => ({ url: photo }))}
                />
                <div className={styles.block}>
                    <DatePicker
                        name="birthDate"
                        className={classNames(styles.field, styles.birthDate)}
                        label={translate.BirthDate}
                        onChange={onChangeField}
                        value={formik.values.birthDate}
                    />
                    <Sex
                        name="sex"
                        className={classNames(styles.field, styles.sex)}
                        label={translate.Sex}
                        onChange={onChangeField}
                        value={formik.values.sex}
                    />
                </div>
                <Phones
                    name="phones"
                    className={styles.field}
                    label={translate.Phone}
                    onChange={(val) => onCustomFieldChange(null, val, 'phones')}
                    value={formik.values.phones}
                />
                <Emails
                    name="emails"
                    className={styles.field}
                    label={translate.Emails}
                    onChange={(val) => onCustomFieldChange(null, val, 'emails')}
                    value={formik.values.emails}
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

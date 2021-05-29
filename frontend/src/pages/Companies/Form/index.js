import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useFormik } from 'formik';

import { useTranslate } from 'hooks';
import { Regions, Links, Addresses, Recruiters, File } from 'components';
import { Checkbox, Input, Textarea } from 'components/Form-NEW';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getCompanyFormSelector } from 'store/selectors/companyForm';
import { setCompanyFormStateEffect } from 'store/effects/forms/company';
import { FormWrapper } from '../componets';

import styles from './styles.module.scss';

const Form = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const formFields = useSelector(getCompanyFormSelector);

    const formik = useFormik({
        initialValues: { ...formFields },
        enableReinitialize: true,
    });

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setCompanyFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setCompanyFormStateEffect({ [name]: value }));
    };

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id} onSubmit={formik.handleSubmit}>
                <Checkbox
                    direction={Checkbox.DIRECTION_RIGHT}
                    className={classNames(styles.field, styles.active)}
                    labelTextClassName={styles.activeText}
                    label={translate.InActiveSearch}
                    onChange={(e, val, isChecked) => onCustomFieldChange(e, isChecked, 'inActiveSearch')}
                    checked={formik.values.inActiveSearch}
                />
                <Input
                    name="name"
                    className={classNames(className, styles.field)}
                    label={translate.Calling}
                    onChange={onChangeField}
                    value={formik.values.name}
                />
                <Recruiters
                    name="users"
                    className={classNames(className, styles.field)}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'users')}
                    value={formFields.users}
                />
                <File
                    id="logo"
                    label={translate.Logo}
                    onChange={(newFile) => onCustomFieldChange(null, newFile, 'logo')}
                    value={formFields.logo}
                />
                <Regions
                    className={styles.field}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'regions')}
                    value={formFields.regions}
                />
                <Links
                    name="links"
                    className={styles.field}
                    label={translate.Links}
                    onChange={(val) => onCustomFieldChange(null, val, 'links')}
                    value={formFields.links}
                />
                <Addresses
                    name="addresses"
                    className={styles.field}
                    label={translate.Addresses}
                    onChange={(val) => onCustomFieldChange(null, val, 'addresses')}
                    value={formFields.addresses}
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

Form.propTypes = {
    className: PropTypes.string,
};

Form.defaultProps = {
    className: '',
};

export default Form;

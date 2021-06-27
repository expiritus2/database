import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Activities, Regions, Links, Addresses, Recruiters, AddPhoto } from 'components';
import { Checkbox, Input, Textarea } from 'components/Form';

import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getCompanyFormSelector } from 'store/selectors/companyForm';
import { setCompanyFormStateEffect } from 'store/effects/forms/company';
import { FormWrapper } from '../componets';

import styles from './styles.module.scss';
import { emptyLink, emptyMessenger } from '../../../settings/constants/templates';

const Form = (props) => {
    const { className } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const modal = useSelector(getModalStateSelector);
    const { formFields } = useSelector(getCompanyFormSelector);

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setCompanyFormStateEffect({ [propName]: val }));
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        dispatch(setCompanyFormStateEffect({ [name]: value }));
    };

    useEffect(() => {
        if (!formFields.links?.length) {
            onCustomFieldChange(null, [emptyLink], 'links');
        }
    }, []); // eslint-disable-line

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
                    label={translate.Calling}
                    onChange={onChangeField}
                    value={formFields.name}
                />
                <Recruiters
                    name="users"
                    className={classNames(className, styles.field)}
                    onChange={(e, val) => onCustomFieldChange(e, val, 'users')}
                    value={formFields.users}
                />
                <AddPhoto
                    className={styles.field}
                    onChange={(files, values) => {
                        onCustomFieldChange(files, values, 'photo');
                    }}
                    value={formFields.photo}
                    id="companyLogo"
                    multiple={false}
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

import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { getModalStateSelector } from 'store/selectors/app';
import { getApplicantFormSelector } from 'store/selectors/applicantForm';

import { AddPhoto, Sex, Phones, Emails, Messengers, Links } from 'components';
import { Input, DatePicker } from 'components/Form';
import { setApplicantFormStateEffect } from 'store/effects/forms/applicant';
import { emptyLink, emptyMessenger } from 'settings/constants/templates';
import { FormWrapper } from '../components';
import Name from '../components/Name';

import styles from './styles.module.scss';

const InfoForm = (props) => {
    const { className } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const modal = useSelector(getModalStateSelector);
    const { formFields } = useSelector(getApplicantFormSelector);

    const onCustomFieldChange = (e, val, propName) => {
        dispatch(setApplicantFormStateEffect({ [propName]: val }));
    };

    const onChangeField = useCallback((e) => {
        const { name, value } = e.target;
        dispatch(setApplicantFormStateEffect({ [name]: value }));
    }, [dispatch]);

    useEffect(() => {
        if (!formFields.messengers?.length) {
            onCustomFieldChange(null, [emptyMessenger], 'messengers');
        }

        if (!formFields.links?.length) {
            onCustomFieldChange(null, [emptyLink], 'links');
        }
    }, []); // eslint-disable-line

    return (
        <FormWrapper className={classNames(styles.wrapper, className)}>
            <form id={modal.id}>
                <Name />
                <Input
                    name="nameLat"
                    className={styles.field}
                    label={translate.FIOLat}
                    onChange={onChangeField}
                    value={formFields.nameLat}
                />
                <AddPhoto
                    className={styles.field}
                    onChange={(files, values) => {
                        onCustomFieldChange(files, values, 'photos');
                    }}
                    value={formFields.photos}
                    id="applicantPhotos"
                />
                <div className={styles.block}>
                    <DatePicker
                        name="birthDate"
                        className={classNames(styles.field, styles.birthDate)}
                        label={translate.BirthDate}
                        onChange={onChangeField}
                        value={formFields.birthDate}
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
                />
            </form>
        </FormWrapper>
    );
};

InfoForm.propTypes = {
    className: PropTypes.string,
};

InfoForm.defaultProps = {
    className: '',
};

export default InfoForm;

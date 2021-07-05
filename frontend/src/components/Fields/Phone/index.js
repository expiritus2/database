/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslate } from 'hooks';
import { PhoneInput } from 'components';
import { Select } from 'components/Form';

import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyPhoneTypesSelector } from 'store/selectors/vocabulary';
import { getVocabularyPhoneTypesEffect } from 'store/effects/vocabulary';
import styles from './styles.module.scss';
import { emptyPhone } from '../../../settings/constants/templates';

const Phone = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const { phoneTypes, isIdle } = useSelector(getVocabularyPhoneTypesSelector);

    useEffect(() => {
        if (isIdle) {
            dispatch(getVocabularyPhoneTypesEffect({}, { silent: true }));
        }
    });

    const onChangeType = (event) => {
        onChange(event, { ...value, phoneType: event.target.value });
    };

    const onChangeNumber = (floatValue) => {
        onChange(null, { ...value, number: floatValue });
    };

    return (
        <div className={classNames(styles.inputWrapper, className)}>
            <div className={styles.block}>
                <Select
                    name="phoneType"
                    label={translate.Type}
                    className={styles.type}
                    options={phoneTypes}
                    onChange={onChangeType}
                    value={value?.phoneType || ''}
                />
                <PhoneInput
                    label={translate.Phone}
                    className={styles.number}
                    value={value?.number}
                    onChange={onChangeNumber}
                />
            </div>
        </div>
    );
};

Phone.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        phoneType: PropTypes.shape({}),
    }),
    onChange: PropTypes.func,
};

Phone.defaultProps = {
    className: '',
    value: emptyPhone,
    onChange: () => {},
};

export default Phone;

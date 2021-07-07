/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { PhoneInput } from 'components';
import { Button, Select } from 'components/Form';

import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyPhoneTypesSelector } from 'store/selectors/vocabulary';
import { getVocabularyPhoneTypesEffect } from 'store/effects/vocabulary';
import styles from './styles.module.scss';

const Phones = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);
    const dispatch = useDispatch();
    const { phoneTypes, isIdle } = useSelector(getVocabularyPhoneTypesSelector);

    useEffect(() => {
        if (isIdle) {
            dispatch(getVocabularyPhoneTypesEffect({}, { silent: true }));
        }
    });

    useEffect(() => setValues(value), [value]);

    const onChangeType = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], phoneType: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onAddPhone = () => {
        const newValue = [...values, { phoneType: {}, number: '' }];
        setValues(newValue);
        onChange(newValue);
    };

    const onChangeNumber = (floatValue, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], number: floatValue });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onRemove = (index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1);
        setValues(clonedValues);
        onChange(clonedValues);
    };

    return (
        <div className={classNames(styles.fieldsArray, className)}>
            <div className={styles.label}>{translate.Phones}</div>
            {!!values?.length && values.map((val, index) => (
                <div key={index} className={styles.block}>
                    <Select
                        name="phoneType"
                        label={translate.Type}
                        className={styles.type}
                        options={phoneTypes}
                        onChange={(event) => onChangeType(event, index)}
                        value={val?.phoneType}
                    />
                    <PhoneInput
                        label={translate.Phone}
                        className={styles.number}
                        value={val?.number}
                        onChange={(phoneNumber) => onChangeNumber(phoneNumber, index)}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.addPhone} onClick={onAddPhone} title={translate.AddPhone} />
        </div>
    );
};

Phones.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func,
};

Phones.defaultProps = {
    className: '',
    value: [{ phoneType: {}, number: '' }],
    onChange: () => {},
};

export default Phones;

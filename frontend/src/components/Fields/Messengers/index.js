/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { Button, Input, Select } from 'components/Form';

import { useDispatch, useSelector } from 'react-redux';
import { getVocabularyMessengerTypesSelector } from 'store/selectors/vocabulary';
import { getVocabularyMessengerTypesEffect } from 'store/effects/vocabulary';
import { emptyMessenger } from 'settings/constants/templates';

import styles from './styles.module.scss';

const Messengers = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);
    const dispatch = useDispatch();
    const { messengerTypes, isIdle } = useSelector(getVocabularyMessengerTypesSelector);

    useEffect(() => setValues(value), [value]);

    useEffect(() => {
        if (isIdle) {
            dispatch(getVocabularyMessengerTypesEffect({}, { silent: true }));
        }
    }, []); // eslint-disable-line

    const onChangeMessenger = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], messengerType: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onAddMessenger = () => {
        const newValue = [...values, ...Messengers.defaultProps.value];
        setValues(newValue);
        onChange(newValue);
    };

    const onChangeAccountName = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], accountName: event.target.value });
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
            <div className={styles.label}>{translate.Messengers}</div>
            {!!values?.length && values.map((val, index) => (
                <div key={index} className={styles.block}>
                    <Select
                        name="messenger"
                        label={translate.Messenger}
                        className={styles.type}
                        options={messengerTypes}
                        onChange={(event) => onChangeMessenger(event, index)}
                        value={val?.messengerType || ''}
                    />
                    <Input
                        label={translate.AccountName}
                        className={styles.number}
                        value={val?.accountName}
                        onChange={(event) => onChangeAccountName(event, index)}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.addPhone} color="primary" onClick={onAddMessenger} title={translate.AddMessenger} />
        </div>
    );
};

Messengers.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func,
};

Messengers.defaultProps = {
    className: '',
    value: [emptyMessenger],
    onChange: () => {},
};

export default Messengers;

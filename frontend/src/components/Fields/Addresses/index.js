/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { Button, Input } from 'components/Form';

import styles from './styles.module.scss';

const Addresses = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const onAdd = () => {
        const newValue = [...values, ...Addresses.defaultProps.value];
        setValues(newValue);
        onChange(newValue);
    };

    const onChangeHandler = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, event.target.value);
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
            <div className={styles.label}>{translate.Addresses}</div>
            {!!values?.length && values.map((val, index) => (
                <div key={index} className={styles.block}>
                    <Input
                        label={translate.Address}
                        className={styles.number}
                        value={val}
                        onChange={(event) => onChangeHandler(event, index)}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.addPhone} color="primary" onClick={onAdd} title={translate.AddAddress} />
        </div>
    );
};

Addresses.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

Addresses.defaultProps = {
    className: '',
    value: [''],
    onChange: () => {},
};

export default Addresses;

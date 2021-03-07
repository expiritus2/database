/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { NumberInput, Select, Button } from 'components';

import { cloneDeep } from 'lodash-es';
import styles from './styles.module.scss';

const Phones = (props) => {
    const { className, value, label } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const onChangeType = (type) => {
        console.log(type);
    };

    const onAddPhone = () => {
        setValues([...values, { type: '', number: '' }]);
    };

    const onChangeNumber = (number, index) => {
        console.log(number, index);
    };

    const onRemove = (index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1);
        setValues(clonedValues);
    };

    return (
        <div className={classNames(styles.fieldsArray, className)}>
            {!!values?.length && values.map((val, index) => (
                <div key={index} className={styles.block}>
                    <Select
                        label={translate.Type}
                        className={styles.type}
                        options={Phones.typeOptions(translate)}
                        onChange={(phoneType) => onChangeType(phoneType, index)}
                        value={val?.type || ''}
                    />
                    <NumberInput
                        label={label}
                        className={styles.number}
                        format="+375 (##) ###-##-##"
                        value={val?.number}
                        onChange={(number) => onChangeNumber(number, index)}
                    />
                    <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                </div>
            ))}
            <Button className={styles.addPhone} color="primary" onClick={onAddPhone}>Add Phone</Button>
        </div>
    );
};

Phones.typeOptions = (translate) => [
    { value: 'home', label: translate.Private },
    { value: 'work', label: translate.Work },
];

Phones.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({})),
};

Phones.defaultProps = {
    className: '',
    value: [],
};

export default Phones;

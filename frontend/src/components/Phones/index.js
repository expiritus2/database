/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';

import Typography from '@material-ui/core/Typography';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { NumberInput, Select, Button } from 'components';
import Paper from '@material-ui/core/Paper';

import styles from './styles.module.scss';

const Phones = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const onChangeType = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], type: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onAddPhone = () => {
        const newValue = [...values, { type: '', number: '' }];
        setValues(newValue);
        onChange(newValue);
    };

    const onChangeNumber = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], number: event.target.value });
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
        <Paper elevation={3} className={classNames(styles.fieldsArray, className)}>
            <Typography className={styles.label}>{translate.Phones}</Typography>
            {!!values?.length && values.map((val, index) => (
                <div key={index} className={styles.block}>
                    <Select
                        name="phoneType"
                        label={translate.Type}
                        className={styles.type}
                        options={Phones.typeOptions(translate)}
                        onChange={(event) => onChangeType(event, index)}
                        value={val?.type || ''}
                    />
                    <NumberInput
                        label={translate.Phone}
                        className={styles.number}
                        format="+375 (##) ###-##-##"
                        value={val?.number}
                        onChange={(number) => onChangeNumber(number, index)}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.addPhone} color="primary" onClick={onAddPhone}>{translate.AddPhone}</Button>
        </Paper>
    );
};

Phones.typeOptions = (translate) => [
    { value: 'home', label: translate.Private },
    { value: 'work', label: translate.Work },
];

Phones.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func,
};

Phones.defaultProps = {
    className: '',
    value: [{ type: '', number: '' }],
    onChange: () => {},
};

export default Phones;

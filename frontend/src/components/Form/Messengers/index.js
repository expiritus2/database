/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { cloneDeep } from 'lodash-es';
import Typography from '@material-ui/core/Typography';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { Select, Button, Input } from 'components';

import Paper from '@material-ui/core/Paper';

import styles from './styles.module.scss';

const Messengers = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const onChangeMessenger = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], messenger: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onAddMessenger = () => {
        const newValue = [...values, Messengers.defaultProps.value];
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
        <Paper elevation={3} className={classNames(styles.fieldsArray, className)}>
            <Typography className={styles.label}>{translate.Messengers}</Typography>
            {!!values?.length && values.map((val, index) => (
                <div key={index} className={styles.block}>
                    <Select
                        name="messenger"
                        label={translate.Messenger}
                        className={styles.type}
                        options={Messengers.messengersOptions(translate)}
                        onChange={(event) => onChangeMessenger(event, index)}
                        value={val?.messenger || ''}
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
            <Button className={styles.addPhone} color="primary" onClick={onAddMessenger}>{translate.AddMessenger}</Button>
        </Paper>
    );
};

Messengers.messengersOptions = (translate) => [
    { value: 'skype', label: translate.Skype },
    { value: 'telegram', label: translate.Telegram },
];

Messengers.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func,
};

Messengers.defaultProps = {
    className: '',
    value: [{ messenger: '', accountName: '' }],
    onChange: () => {},
};

export default Messengers;

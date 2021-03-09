/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { Button, Input } from 'components';

import { cloneDeep } from 'lodash-es';
import styles from './styles.module.scss';

const Emails = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const onAddPhone = () => {
        setValues([...values, '']);
    };

    const onChangeField = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, event.target.value);
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onRemove = (index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1);
        setValues(clonedValues);
    };

    return (
        <Paper className={classNames(styles.fieldsArray, className)}>
            <Typography className={styles.label}>{translate.Emails}</Typography>
            {!!values?.length && values.map((val, index) => (
                <div className={styles.block} key={index}>
                    <Input
                        className={styles.inputField}
                        label={translate.Email}
                        value={val}
                        onChange={(event) => onChangeField(event, index)}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.add} color="primary" onClick={onAddPhone}>{translate.AddEmail}</Button>
        </Paper>
    );
};

Emails.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

Emails.defaultProps = {
    className: '',
    value: [''],
    onChange: () => {},
};

export default Emails;

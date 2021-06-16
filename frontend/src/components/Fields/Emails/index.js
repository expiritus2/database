/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { IoIosRemoveCircle } from 'react-icons/io';
import { useTranslate } from 'hooks';
import { Button, Input } from 'components/Form';

import { cloneDeep } from 'lodash-es';
import styles from './styles.module.scss';

const Emails = (props) => {
    const { className, value, onChange } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const onAddEmail = () => {
        setValues([...values, { email: '' }]);
    };

    const onChangeField = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { email: event.target.value });
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
            <div className={styles.label}>{translate.Emails}</div>
            {!!values?.length && values.map((val, index) => (
                <div className={styles.block} key={index}>
                    <Input
                        className={styles.inputField}
                        label={translate.Email}
                        value={val?.email || ''}
                        onChange={(event) => onChangeField(event, index)}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.add} color="primary" onClick={onAddEmail} title={translate.AddEmail} />
        </div>
    );
};

Emails.propTypes = {
    className: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.shape({
        email: '',
    })),
    onChange: PropTypes.func,
};

Emails.defaultProps = {
    className: '',
    value: [{ email: '' }],
    onChange: () => {},
};

export default Emails;

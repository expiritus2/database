/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useTranslate } from 'hooks';
import { Button, Select } from 'components/index';
import { cloneDeep } from 'lodash-es';
import { IoIosRemoveCircle } from 'react-icons/io';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import styles from './styles.module.scss';

const Languages = (props) => {
    const { className, onChange, value, name } = props;
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);

    const onChangeLanguage = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], name: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onChangeLevel = (event, index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1, { ...clonedValues?.[index], level: event.target.value });
        setValues(clonedValues);
        onChange(clonedValues);
    };

    const onAddLanguage = () => {
        const newValue = [...values, { name: '', level: '' }];
        setValues(newValue);
        onChange(newValue);
    };

    const onRemove = (index) => {
        const clonedValues = cloneDeep(values);
        clonedValues.splice(index, 1);
        setValues(clonedValues);
        onChange(clonedValues);
    };

    return (
        <Paper elevation={3} className={classNames(styles.fieldsArray, className)}>
            <Typography className={styles.label}>{translate.Languages}</Typography>
            {value.map((language, index) => (
                <div className={styles.block} key={index}>
                    <Select
                        className={styles.language}
                        name={name}
                        label={translate.Language}
                        options={Languages.options(translate)}
                        onChange={(e) => onChangeLanguage(e, index)}
                        value={language?.name}
                    />
                    <Select
                        className={styles.level}
                        name={name}
                        label={translate.Level}
                        options={Languages.levelOptions(translate)}
                        onChange={(e) => onChangeLevel(e, index)}
                        value={language?.level}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.addLanguage} color="primary" onClick={onAddLanguage}>{translate.AddLanguage}</Button>
        </Paper>
    );
};

Languages.options = (translate) => [
    { label: translate.English, value: 'english' },
    { label: translate.Russian, value: 'russian' },
];

Languages.levelOptions = (translate) => [
    { label: translate.Elementary, value: 'elementary' },
    { label: translate.PreIntermediate, value: 'preIntermediate' },
    { label: translate.Intermediate, value: 'intermediate' },
    { label: translate.UpperIntermediate, value: 'upperIntermediate' },
    { label: translate.Advanced, value: 'advanced' },
    { label: translate.Native, value: 'native' },
];

Languages.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        })),
    ]),
};

Languages.defaultProps = {
    name: undefined,
    className: '',
    onChange: () => {},
    value: [],
};

export default Languages;

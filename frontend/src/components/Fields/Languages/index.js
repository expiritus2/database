/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslate } from 'hooks';
import { Button, Select } from 'components/Form';
import { cloneDeep } from 'lodash-es';
import { IoIosRemoveCircle } from 'react-icons/io';
import { getVocabularyLanguagesEffect, getVocabularyLanguageLevelsEffect } from 'store/effects/vocabulary';

import { getVocabularyLanguagesSelector, getVocabularyLanguageLevelsSelector } from 'store/selectors/vocabulary';
import styles from './styles.module.scss';

const Languages = (props) => {
    const { className, onChange, value, name } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const [values, setValues] = useState(value);
    const { languages } = useSelector(getVocabularyLanguagesSelector);
    const { languageLevels } = useSelector(getVocabularyLanguageLevelsSelector);

    useEffect(() => {
        dispatch(getVocabularyLanguagesEffect({}, { silent: true }));
        dispatch(getVocabularyLanguageLevelsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

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
        <div className={classNames(styles.fieldsArray, className)}>
            <p className={styles.label}>{translate.Languages}</p>
            {(value || []).map((language, index) => (
                <div className={styles.block} key={index}>
                    <Select
                        className={styles.language}
                        name={name}
                        label={translate.Language}
                        options={languages}
                        onChange={(e) => onChangeLanguage(e, index)}
                        value={language?.name}
                    />
                    <Select
                        className={styles.level}
                        name={name}
                        label={translate.Level}
                        options={languageLevels}
                        onChange={(e) => onChangeLevel(e, index)}
                        value={language?.level}
                    />
                    {values?.length > 1 && (
                        <IoIosRemoveCircle onClick={() => onRemove(index)} className={styles.removeIcon} />
                    )}
                </div>
            ))}
            <Button className={styles.addLanguage} color="primary" onClick={onAddLanguage} title={translate.AddLanguage} />
        </div>
    );
};

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

/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslate } from 'hooks';
import { Select } from 'components/Form';
import { getVocabularyLanguagesEffect, getVocabularyLanguageLevelsEffect } from 'store/effects/vocabulary';

import { getVocabularyLanguagesSelector, getVocabularyLanguageLevelsSelector } from 'store/selectors/vocabulary';
import styles from './styles.module.scss';

const Language = (props) => {
    const { className, onChange, value, name } = props;
    const dispatch = useDispatch();
    const { translate } = useTranslate();
    const { languages } = useSelector(getVocabularyLanguagesSelector);
    const { languageLevels } = useSelector(getVocabularyLanguageLevelsSelector);

    useEffect(() => {
        dispatch(getVocabularyLanguagesEffect({}, { silent: true }));
        dispatch(getVocabularyLanguageLevelsEffect({}, { silent: true }));
    }, []); // eslint-disable-line

    const onChangeLanguage = (event) => {
        onChange(event, { ...value, language: event.target.value });
    };

    const onChangeLevel = (event) => {
        onChange(event, { ...value, languageLevel: event.target.value });
    };

    return (
        <div className={classNames(styles.languageWrapper, className)}>
            <div className={styles.block}>
                <Select
                    className={styles.language}
                    name={name}
                    label={translate.Language}
                    options={languages}
                    onChange={onChangeLanguage}
                    value={value?.language}
                />
                <Select
                    className={styles.level}
                    name={name}
                    label={translate.Level}
                    options={languageLevels}
                    onChange={onChangeLevel}
                    value={value?.languageLevel}
                />
            </div>
        </div>
    );
};

Language.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.shape({
        language: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
        languageLevel: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
        }),
    }),
};

Language.defaultProps = {
    name: undefined,
    className: '',
    onChange: () => {},
    value: [],
};

export default Language;

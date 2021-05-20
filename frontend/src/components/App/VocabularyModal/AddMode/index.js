import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import {
    setVocabularyModeEffect,
    saveVocabularySkillEffect,
    saveVocabularyPositionEffect,
    saveVocabularyRegionEffect,
    saveVocabularyWorkTypeEffect,
    saveVocabularyWorkPlaceEffect,
    saveVocabularyWorkScheduleEffect,
    saveVocabularyEventTypeEffect,
    saveVocabularyLanguageEffect,
    saveVocabularyLanguageLevelEffect,
    saveVocabularyLinkTypeEffect,
} from 'store/effects/vocabulary';
import { Input, Button } from 'components/Form-NEW';
import { getVocabularyModeSelector } from 'store/selectors/vocabulary';
import { useTranslate } from 'hooks';
import { ADD_MODE } from 'settings/constants/modes';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { snakeCase } from 'lodash-es';
import { vocabularyTabsIds } from 'settings/constants/vocabulary';

import styles from './styles.module.scss';

const cyrillicToTranslit = new CyrillicToTranslit();

const AddMode = (props) => {
    const { activeTab, scrollContainerRef, className } = props;
    const dispatch = useDispatch();
    const vocabularyMode = useSelector(getVocabularyModeSelector);
    const { translate } = useTranslate();
    const [inputValue, setInputValue] = useState('');
    const [isPending, setIsPending] = useState(false);

    useEffect(() => setInputValue(''), [vocabularyMode, activeTab]);
    useEffect(() => dispatch(setVocabularyModeEffect(null)), [activeTab, dispatch]);

    const onChangeHandler = (e, value) => {
        setInputValue(value);
    };

    const getEffect = () => {
        switch (activeTab) {
            case vocabularyTabsIds.skills: return saveVocabularySkillEffect;
            case vocabularyTabsIds.positions: return saveVocabularyPositionEffect;
            case vocabularyTabsIds.regions: return saveVocabularyRegionEffect;
            case vocabularyTabsIds.workTypes: return saveVocabularyWorkTypeEffect;
            case vocabularyTabsIds.workPlaces: return saveVocabularyWorkPlaceEffect;
            case vocabularyTabsIds.workSchedules: return saveVocabularyWorkScheduleEffect;
            case vocabularyTabsIds.eventTypes: return saveVocabularyEventTypeEffect;
            case vocabularyTabsIds.languages: return saveVocabularyLanguageEffect;
            case vocabularyTabsIds.languageLevels: return saveVocabularyLanguageLevelEffect;
            case vocabularyTabsIds.linkTypes: return saveVocabularyLinkTypeEffect;
            default: return () => {};
        }
    };

    const scrollToBottom = useCallback(() => {
        if (scrollContainerRef?.current) {
            const container = scrollContainerRef?.current;
            container?.scrollTo(0, scrollContainerRef?.current?.scrollHeight);

            const interval = setInterval(() => {
                if (container?.scrollTop >= container?.scrollHeight - container?.offsetHeight) {
                    clearInterval(interval);
                } else {
                    container?.scrollTo(0, scrollContainerRef?.current?.scrollHeight);
                }
            }, 100);
        }
    }, [scrollContainerRef]);

    const onSave = () => {
        if (!inputValue) return null;

        const effect = getEffect();
        const value = snakeCase(cyrillicToTranslit.transform(inputValue));
        setIsPending(true);
        dispatch(effect({ label: inputValue, value }, { silent: true }, (err) => {
            if (!err) { setInputValue(''); }
            setIsPending(false);
            scrollToBottom();
        }));
    };

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSave();
        }
    };

    return (
        <div className={classNames(styles.addMode, { [styles.hidden]: vocabularyMode !== ADD_MODE }, className)}>
            <Input
                onKeyPress={onKeyPress}
                onChange={onChangeHandler}
                value={inputValue}
                className={styles.input}
                variant={Input.LIGHT_FULL}
            />
            <Button
                className={styles.saveButton}
                isPending={isPending}
                onClick={onSave}
                title={translate.Save}
            />
        </div>
    );
};

AddMode.propTypes = {
    className: PropTypes.string,
    activeTab: PropTypes.string.isRequired,
    scrollContainerRef: PropTypes.shape({
        current: PropTypes.shape({
            scrollHeight: PropTypes.number,
        }),
    }),
};

AddMode.defaultProps = {
    className: '',
    scrollContainerRef: {},
};

export default AddMode;

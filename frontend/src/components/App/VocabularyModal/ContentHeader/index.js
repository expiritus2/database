import React, { useState, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Papa from 'papaparse';
import { useDispatch, useSelector } from 'react-redux';
import { Settings } from 'components';
import {
    setVocabularyModeEffect,
    saveVocabularySkillsEffect,
    saveVocabularyPositionsEffect,
    saveVocabularyRegionsEffect,
    saveVocabularyWorkTypesEffect,
    saveVocabularyWorkPlacesEffect,
    saveVocabularyWorkSchedulesEffect,
    saveVocabularyEventTypesEffect,
    saveVocabularyLanguagesEffect,
    saveVocabularyLanguageLevelsEffect,
    saveVocabularyLinkTypesEffect,
    saveVocabularyMessengerTypesEffect,
    saveVocabularyPhoneTypesEffect,
    saveVocabularyEducationsEffect,
    saveVocabularyCurrenciesEffect,
    saveVocabularyFileTypesEffect,
} from 'store/effects/vocabulary';
import { Button } from 'components/Form-NEW';
import { useTranslate, useOutsideClick } from 'hooks';
import { getVocabularyModeSelector, getVocabularyTabDataSelector } from 'store/selectors/vocabulary';
import { ADD_MODE } from 'settings/constants/modes';
import { FiSettings } from 'react-icons/fi';
import { readFiles } from 'helpers';
import { CSVLink } from 'react-csv';
import Import from './Import';

import styles from './styles.module.scss';
import { vocabularyTabsIds } from '../../../../settings/constants/vocabulary';

const ContentHeader = (props) => {
    const { className, activeTab } = props;
    const { translate } = useTranslate();
    const dispatch = useDispatch();
    const vocabularyMode = useSelector(getVocabularyModeSelector);
    const currentTabVocabularyData = useSelector((state) => getVocabularyTabDataSelector(state, props));
    const [openSettings, setOpenSettings] = useState(false);
    const settingsRef = useRef();

    useOutsideClick([settingsRef], () => setOpenSettings(false));

    const onAdd = () => {
        const newMode = vocabularyMode === null ? ADD_MODE : null;
        dispatch(setVocabularyModeEffect(newMode));
    };

    const onSettings = () => {
        setOpenSettings(!openSettings);
    };

    const getEffect = useCallback(() => {
        switch (activeTab) {
            case vocabularyTabsIds.skills: return saveVocabularySkillsEffect;
            case vocabularyTabsIds.positions: return saveVocabularyPositionsEffect;
            case vocabularyTabsIds.regions: return saveVocabularyRegionsEffect;
            case vocabularyTabsIds.workTypes: return saveVocabularyWorkTypesEffect;
            case vocabularyTabsIds.workPlaces: return saveVocabularyWorkPlacesEffect;
            case vocabularyTabsIds.workSchedules: return saveVocabularyWorkSchedulesEffect;
            case vocabularyTabsIds.eventTypes: return saveVocabularyEventTypesEffect;
            case vocabularyTabsIds.languages: return saveVocabularyLanguagesEffect;
            case vocabularyTabsIds.languageLevels: return saveVocabularyLanguageLevelsEffect;
            case vocabularyTabsIds.linkTypes: return saveVocabularyLinkTypesEffect;
            case vocabularyTabsIds.messengerTypes: return saveVocabularyMessengerTypesEffect;
            case vocabularyTabsIds.phoneTypes: return saveVocabularyPhoneTypesEffect;
            case vocabularyTabsIds.educations: return saveVocabularyEducationsEffect;
            case vocabularyTabsIds.currencies: return saveVocabularyCurrenciesEffect;
            case vocabularyTabsIds.fileTypes: return saveVocabularyFileTypesEffect;
            default: return () => {};
        }
    }, [activeTab]);

    const onImport = useCallback((files) => {
        readFiles(files, (reader, file) => reader.readAsText(file))
            .then((values) => {
                const csvString = values?.[0]?.data || '';
                const { data } = Papa.parse(csvString, { header: true });
                const effect = getEffect();
                dispatch(effect(data, {}, () => {
                    setOpenSettings(false);
                }));
            });
    }, [getEffect, dispatch]);

    const getCurrentTabVocabularyData = useCallback(() => (
        currentTabVocabularyData.map(({ label, value }) => ({ label, value }))
    ), [currentTabVocabularyData]);

    const settingsList = useMemo(() => [
        {
            label: translate.Import,
            Component: (componentProps) => (
                <Import label={componentProps?.label} id={activeTab} onChange={onImport} />
            ),
        },
        {
            label: translate.Export,
            Component: (componentProps) => {
                const currentData = getCurrentTabVocabularyData();
                if (!currentData?.length) {
                    return <div>{componentProps?.label}</div>;
                }
                return (
                    <CSVLink data={currentData} filename={`${activeTab}.csv`}>{componentProps?.label}</CSVLink>
                );
            },
            onClick: () => setOpenSettings(false),
        },
    ], [translate.Export, translate.Import, activeTab, getCurrentTabVocabularyData, onImport]);

    return (
        <div className={classNames(styles.contentHeader, className)}>
            <Button onClick={onAdd} title={vocabularyMode === ADD_MODE ? translate.Reset : translate.Add} />
            <div ref={settingsRef} className={styles.settingsHolder}>
                <FiSettings onClick={onSettings} className={styles.settingsIcon} />
                <Settings open={openSettings} list={settingsList} />
            </div>
        </div>
    );
};

ContentHeader.propTypes = {
    className: PropTypes.string,
    activeTab: PropTypes.string.isRequired,
};

ContentHeader.defaultProps = {
    className: '',
};

export default ContentHeader;

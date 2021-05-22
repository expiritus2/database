import { combineReducers } from 'redux';
import { vocabularyTabsIds } from 'settings/constants/vocabulary';

import mode from './mode';
import skills from './skills';
import positions from './positions';
import regions from './regions';
import workTypes from './workTypes';
import workPlaces from './workPlaces';
import workSchedules from './workSchedules';
import eventTypes from './eventTypes';
import languages from './languages';
import languageLevels from './languageLevels';
import linkTypes from './linkTypes';
import messengerTypes from './messengerTypes';
import phoneTypes from './phoneTypes';
import educations from './educations';
import currencies from './currencies';
import fileTypes from './fileTypes';

export default combineReducers({
    mode,
    [vocabularyTabsIds.skills]: skills,
    [vocabularyTabsIds.positions]: positions,
    [vocabularyTabsIds.regions]: regions,
    [vocabularyTabsIds.workTypes]: workTypes,
    [vocabularyTabsIds.workPlaces]: workPlaces,
    [vocabularyTabsIds.workSchedules]: workSchedules,
    [vocabularyTabsIds.eventTypes]: eventTypes,
    [vocabularyTabsIds.languages]: languages,
    [vocabularyTabsIds.languageLevels]: languageLevels,
    [vocabularyTabsIds.linkTypes]: linkTypes,
    [vocabularyTabsIds.messengerTypes]: messengerTypes,
    [vocabularyTabsIds.phoneTypes]: phoneTypes,
    [vocabularyTabsIds.educations]: educations,
    [vocabularyTabsIds.currencies]: currencies,
    [vocabularyTabsIds.fileTypes]: fileTypes,
});

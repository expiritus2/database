import { combineReducers } from 'redux';

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

export default combineReducers({
    mode,
    skills,
    positions,
    regions,
    workTypes,
    workPlaces,
    workSchedules,
    eventTypes,
    languages,
    languageLevels,
    linkTypes,
});

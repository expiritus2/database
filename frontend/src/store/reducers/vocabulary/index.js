import { combineReducers } from 'redux';

import mode from './mode';
import skills from './skills';
import positions from './positions';
import regions from './regions';

export default combineReducers({
    mode,
    skills,
    positions,
    regions,
});

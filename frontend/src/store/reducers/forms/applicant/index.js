import { combineReducers } from 'redux';

import profile from './profile';
import experience from './experience';
import info from './info';
import files from './files';

export default combineReducers({
    profile,
    experience,
    info,
    files,
});

import { combineReducers } from 'redux';

import user from './user';
import app from './app';
import forms from './forms';

export default combineReducers({
    app,
    user,
    forms,
});

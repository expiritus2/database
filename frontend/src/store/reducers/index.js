import { combineReducers } from 'redux';

import user from './user';
import app from './app';
import forms from './forms';
import applicants from './applicants';

export default combineReducers({
    app,
    user,
    forms,
    applicants,
});

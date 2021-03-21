import { combineReducers } from 'redux';

import user from './user';
import app from './app';
import forms from './forms';
import applicants from './applicants';
import applicant from './applicant';

export default combineReducers({
    app,
    user,
    forms,
    applicants,
    applicant,
});

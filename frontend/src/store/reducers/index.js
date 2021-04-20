import { combineReducers } from 'redux';

import user from './user';
import app from './app';
import forms from './forms';
import applicants from './applicants';
import applicant from './applicant';
import contacts from './contacts';
import contact from './contact';
import vacancies from './vacancies';
import vacancy from './vacancy';
import companies from './companies';
import company from './company';
import resources from './resources';

export default combineReducers({
    app,
    user,
    forms,
    applicants,
    applicant,
    contacts,
    contact,
    vacancies,
    vacancy,
    companies,
    company,
    resources,
});

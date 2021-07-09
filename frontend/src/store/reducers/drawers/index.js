import { combineReducers } from 'redux';

import applicantSearch from './applicantSearch';
import vacancySearch from './vacancySearch';
import companySearch from './companySearch';
import contactSearch from './contactSearch';

export default combineReducers({
    applicantSearch,
    vacancySearch,
    companySearch,
    contactSearch,
});

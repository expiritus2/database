import { combineReducers } from 'redux';

import applicantSearch from './applicantSearch';
import vacancySearch from './vacancySearch';
import companySearch from './companySearch';

export default combineReducers({
    applicantSearch,
    vacancySearch,
    companySearch,
});

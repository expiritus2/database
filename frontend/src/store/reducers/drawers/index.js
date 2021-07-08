import { combineReducers } from 'redux';

import applicantSearch from './applicantSearch';
import vacancySearch from './vacancySearch';

export default combineReducers({
    applicantSearch,
    vacancySearch,
});

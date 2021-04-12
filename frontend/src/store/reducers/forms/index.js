import { combineReducers } from 'redux';

import applicant from './applicant';
import contact from './contact';
import vacancy from './vacancy';
import company from './company';

export default combineReducers({
    applicant,
    contact,
    vacancy,
    company,
});

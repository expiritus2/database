import { combineReducers } from 'redux';

import applicant from './applicant';
import contact from './contact';
import vacancy from './vacancy';

export default combineReducers({
    applicant,
    contact,
    vacancy,
});

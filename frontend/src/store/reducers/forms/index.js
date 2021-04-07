import { combineReducers } from 'redux';

import applicant from './applicant';
import contact from './contact';

export default combineReducers({
    applicant,
    contact,
});

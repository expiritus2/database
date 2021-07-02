import { handleActions } from 'redux-actions';
import { openApplicantSearchDrawerAction, setApplicantSearchFieldsAction } from 'store/actions/drawers';
import { get } from 'lodash-es';
import {
    emptyEmail,
    emptyLanguageSkill,
    emptyLink,
    emptyMessenger,
    emptyPhone,
    emptySalary,
} from 'settings/constants/templates';

const initialData = {
    open: false,
    formFields: {
        name: '',
        inActiveSearch: false,
        salary: emptySalary,
        education: '',
        positions: [],
        skills: [],
        workPlaces: [],
        regions: [],
        languageSkills: [emptyLanguageSkill],
        photos: [],
        phones: [emptyPhone],
        messengers: [emptyMessenger],
        links: [emptyLink],
        emails: [emptyEmail],
        experienceYears: 0,
    },
};

export default handleActions({
    [openApplicantSearchDrawerAction]: (state, { payload }) => ({
        ...state,
        open: get(payload, 'open', initialData.open),
    }),
    [setApplicantSearchFieldsAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            ...payload,
        },
    }),
}, initialData);

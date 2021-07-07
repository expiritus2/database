import { handleActions } from 'redux-actions';
import { openApplicantSearchDrawerAction, setApplicantSearchFieldsAction, resetApplicantSearchFieldsAction } from 'store/actions/drawers';
import { cloneDeep, get } from 'lodash-es';
import {
    emptyEmail,
    emptyLanguageSkill,
    emptyLink,
    emptyMessenger,
    emptyPhone,
} from 'settings/constants/templates';
import { setApplicantsSearchAction } from 'store/actions/applicants';

const initialData = {
    open: false,
    formFields: {
        inActiveSearch: false,
        id: '',
        name: '',
        nameLat: '',
        sex: null,
        ageRange: { min: '', max: '' },
        salaryRange: { min: '', max: '', currency: null },
        positions: [],
        skills: [],
        regions: [],
        workPlaces: [],
        experienceRange: { min: '', max: '' },
        languageSkill: emptyLanguageSkill,
        phone: emptyPhone,
        email: emptyEmail,
        messenger: emptyMessenger,
        link: emptyLink,
        updatedAt: null,
        createdAt: null,
    },
};

export default handleActions({
    [openApplicantSearchDrawerAction]: (state, { payload }) => ({
        ...state,
        open: get(payload, 'open', initialData.open),
    }),
    [setApplicantsSearchAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            name: payload?.string || state?.name,
            inActiveSearch: payload?.active || state?.inActiveSearch,
        },
    }),
    [setApplicantSearchFieldsAction]: (state, { payload }) => ({
        ...state,
        formFields: {
            ...state.formFields,
            ...payload,
        },
    }),
    [resetApplicantSearchFieldsAction]: (state) => ({
        ...state,
        formFields: cloneDeep(initialData.formFields),
    }),
}, initialData);

import { createSelector } from 'reselect';

const localState = ({ resources }) => resources;

export const getResourcesSelector = createSelector(
    localState,
    (resources) => resources,
);

export const getResourcesDataSelector = createSelector(
    localState,
    (resources) => resources?.data,
);

export const getResourcesUsersSelector = createSelector(
    getResourcesDataSelector,
    (resourcesData) => resourcesData?.users || [],
);

export const getResourcesPositionsSelector = createSelector(
    getResourcesDataSelector,
    (resourcesData) => resourcesData?.positions || [],
);

export const getResourcesRegionsSelector = createSelector(
    getResourcesDataSelector,
    (resourcesData) => resourcesData?.regions || [],
);

export const getResourcesSkillsSelector = createSelector(
    getResourcesDataSelector,
    (resourcesData) => resourcesData?.skills || [],
);

export const getResourcesCompaniesSelector = createSelector(
    getResourcesDataSelector,
    (resourcesData) => resourcesData?.companies || [],
);

export const getResourcesContactsSelector = createSelector(
    getResourcesDataSelector,
    (resourcesData) => resourcesData?.contacts || [],
);

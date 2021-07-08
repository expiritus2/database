export const getSearchConfig = (cfg, vacancies, searchCriteria) => ({
    id: searchCriteria?.id || undefined,
    positionId: searchCriteria?.position?.id || undefined,
    userIds: searchCriteria?.users ? searchCriteria.users.map((user) => user?.id) : undefined,
    salaryMin: searchCriteria?.salaryRange?.min || undefined,
    salaryMax: searchCriteria?.salaryRange?.max || undefined,
    currencyId: searchCriteria?.salaryRange?.currency?.id || undefined,
    experienceMin: searchCriteria?.experienceRange?.min || undefined,
    experienceMax: searchCriteria?.experienceRange?.max || undefined,
    skillsIds: searchCriteria?.skills ? searchCriteria?.skills.map((skill) => skill?.id) : undefined,
    regionsIds: searchCriteria?.regions ? searchCriteria?.regions.map((region) => region?.id) : undefined,
    workPlacesIds: searchCriteria?.workPlaces
        ? searchCriteria?.workPlaces.map((workPlace) => workPlace?.id)
        : undefined,
    workSchedulesIds: searchCriteria?.workSchedules
        ? searchCriteria?.workSchedules.map((workSchedule) => workSchedule?.id)
        : undefined,
    workTypesIds: searchCriteria?.workTypes
        ? searchCriteria?.workTypes.map((workType) => workType?.id)
        : undefined,
    updatedAtMin: searchCriteria?.updatedAt?.min || undefined,
    updatedAtMax: searchCriteria?.updatedAt?.max || undefined,
    createdAtMin: searchCriteria?.createdAt?.min || undefined,
    createdAtMax: searchCriteria?.createdAt?.max || undefined,
    search: vacancies?.search?.string || undefined,
    active: vacancies?.search?.active || undefined,
    page: cfg?.page ?? vacancies?.meta?.page,
    countPerPage: cfg?.countPerPage ?? vacancies?.meta?.countPerPage,
});

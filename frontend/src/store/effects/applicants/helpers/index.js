export const getSearchConfig = (cfg, applicants, searchCriteria) => ({
    id: searchCriteria?.id || undefined,
    nameLat: searchCriteria?.nameLat || undefined,
    sexId: searchCriteria?.sex?.id || undefined,
    ageMin: searchCriteria?.ageRange?.min || undefined,
    ageMax: searchCriteria?.ageRange?.max || undefined,
    salaryMin: searchCriteria?.salaryRange?.min || undefined,
    salaryMax: searchCriteria?.salaryRange?.max || undefined,
    currencyId: searchCriteria?.salaryRange?.currency?.id || undefined,
    search: applicants?.search?.string || undefined,
    active: applicants?.search?.active || searchCriteria?.inActiveSearch || undefined,
    page: cfg?.page ?? applicants?.meta?.page,
    countPerPage: cfg?.countPerPage ?? applicants?.meta?.countPerPage,
});

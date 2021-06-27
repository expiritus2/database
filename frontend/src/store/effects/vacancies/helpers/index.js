export const getSearchConfig = (cfg, vacancies) => ({
    search: vacancies?.search?.string || undefined,
    active: vacancies?.search?.active || undefined,
    page: cfg?.page ?? vacancies?.meta?.page,
    countPerPage: cfg?.countPerPage ?? vacancies?.meta?.countPerPage,
});

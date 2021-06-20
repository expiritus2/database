export const getSearchConfig = (cfg, applicants) => ({
    search: applicants?.search?.string || undefined,
    active: applicants?.search?.active || undefined,
    page: cfg?.page ?? applicants?.meta?.page,
    countPerPage: cfg?.countPerPage ?? applicants?.meta?.countPerPage,
});

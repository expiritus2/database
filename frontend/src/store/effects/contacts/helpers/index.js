export const getSearchConfig = (cfg, contacts, searchCriteria) => ({
    id: searchCriteria?.id || undefined,
    companyId: searchCriteria?.company?.id || undefined,
    positionsIds: searchCriteria?.positions ? searchCriteria?.positions.map((position) => position?.id) : undefined,
    sexId: searchCriteria?.sex?.id || undefined,
    phoneTypeId: searchCriteria?.phone?.phoneType?.id || undefined,
    phoneNumber: searchCriteria?.phone?.number || undefined,
    email: searchCriteria?.email?.email || undefined,
    updatedAtMin: searchCriteria?.updatedAt?.min || undefined,
    updatedAtMax: searchCriteria?.updatedAt?.max || undefined,
    createdAtMin: searchCriteria?.createdAt?.min || undefined,
    createdAtMax: searchCriteria?.createdAt?.max || undefined,
    search: searchCriteria?.name || contacts?.search?.string || undefined,
    active: contacts?.search?.active || undefined,
    page: cfg?.page ?? contacts?.meta?.page,
    countPerPage: cfg?.countPerPage ?? contacts?.meta?.countPerPage,
});

export const roles = {
    SUPER_ADMIN: 'superAdmin',
    ADMIN: 'admin',
    MANAGER: 'manager',
};

export const rolesOptions = (translate) => [
    { label: translate.SuperAdmin, value: roles.SUPER_ADMIN },
    { label: translate.Admin, value: roles.ADMIN },
    { label: translate.Manager, value: roles.MANAGER },
];

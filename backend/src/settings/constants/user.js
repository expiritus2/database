const roles = {
    SUPER_ADMIN: 'superAdmin',
    ADMIN: 'admin',
    MANAGER: 'manager',
}

const roleOptions = {
    [roles.SUPER_ADMIN]: { label: 'Супер Админ', value: roles.SUPER_ADMIN },
    [roles.ADMIN]: { label: 'Админ', value: roles.ADMIN },
    [roles.MANAGER]: { label: 'Менеджер', value: roles.MANAGER },
}

const status = {
    PENDING: 'pending',
    ACTIVE: 'active',
}

module.exports = {
    roles,
    roleOptions,
    status,
}
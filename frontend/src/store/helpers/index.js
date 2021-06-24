import { cloneDeep } from 'lodash-es';

export const clearErrors = (errors, valueObj) => {
    const clonedErrors = cloneDeep(errors);

    Object.keys(valueObj || {}).forEach((key) => {
        delete clonedErrors[key];
    });

    return clonedErrors;
};

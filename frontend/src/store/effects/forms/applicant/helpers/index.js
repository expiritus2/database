import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.experienceYears = clonedCfg?.experienceYears || undefined;
    clonedCfg.birthDate = clonedCfg?.birthDate || undefined;

    return clonedCfg;
};

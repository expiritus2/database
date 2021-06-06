import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.birthDate = clonedCfg?.birthDate?.[0];
    clonedCfg.experienceYears = clonedCfg.experienceYears || undefined;

    return clonedCfg;
};

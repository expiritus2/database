import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg, files) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.files = [...(cfg?.files || []), ...(files?.files || [])];
    clonedCfg.photos = [...(cfg?.photos || []), ...(files?.photos || [])];
    clonedCfg.place = clonedCfg?.place?.map(({ value }) => value);
    clonedCfg.birthDate = clonedCfg?.birthDate?.[0];
    clonedCfg.experienceYears = clonedCfg.experienceYears || undefined;

    return clonedCfg;
};

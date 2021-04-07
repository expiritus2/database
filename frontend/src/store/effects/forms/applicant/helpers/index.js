import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg, files) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.files = [
        ...(cfg?.files?.filter((photo) => !(photo instanceof File)).map((ph) => ph?.url || ph) || []),
        ...(files?.files || []),
    ];
    clonedCfg.photos = [
        ...(cfg?.photos?.filter((photo) => !(photo instanceof File)).map((ph) => ph?.url || ph) || []),
        ...(files?.photos || []),
    ];
    clonedCfg.place = clonedCfg?.place?.map(({ value }) => value);
    clonedCfg.birthDate = clonedCfg?.birthDate?.[0];
    clonedCfg.experienceYears = clonedCfg.experienceYears || undefined;

    return clonedCfg;
};

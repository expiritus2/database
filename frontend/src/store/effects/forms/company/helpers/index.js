import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg, files) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.photos = [
        ...(cfg?.photos?.filter((photo) => !(photo instanceof File)).map((ph) => ph?.url || ph) || []),
        ...(files?.photos || []),
    ];
    clonedCfg.birthDate = clonedCfg?.birthDate?.[0];

    return clonedCfg;
};

import { cloneDeep } from 'lodash-es';
import isUrl from 'is-url';
import { cleanOptions } from 'helpers';

export const prepareData = (cfg, files) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.files = [
        ...(cfg?.files.filter((file) => !file?.data).map((ph) => ph?.url || ph) || []),
        ...(files?.files || []),
    ];
    clonedCfg.photos = [
        ...(cfg?.photos
            .filter((photo) => isUrl(photo?.url))
            .map((ph) => ph?.url || ph) || []),
        ...(files?.photos || []),
    ];
    clonedCfg.positions = cleanOptions(clonedCfg?.positions);
    clonedCfg.regions = cleanOptions(clonedCfg?.regions);
    clonedCfg.skills = cleanOptions(clonedCfg?.skills);
    clonedCfg.birthDate = clonedCfg?.birthDate?.[0];
    clonedCfg.experienceYears = clonedCfg.experienceYears || undefined;

    return clonedCfg;
};

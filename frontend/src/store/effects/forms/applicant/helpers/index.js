import { cloneDeep } from 'lodash-es';
import isUrl from 'is-url';
import { cleanOptions } from 'helpers';

export const prepareData = (cfg) => {
    const clonedCfg = cloneDeep(cfg);

    // clonedCfg.files = (cfg?.files || []).map((file) => ({ ...file, data: file.data ? btoa(file.data) : undefined }));
    clonedCfg.photos = [
        ...(cfg?.photos
            .filter((photo) => isUrl(photo?.url))
            .map((ph) => ph?.url || ph) || []),
        // ...(files?.photos || []),
    ];
    clonedCfg.positions = cleanOptions(clonedCfg?.positions);
    clonedCfg.regions = cleanOptions(clonedCfg?.regions);
    clonedCfg.skills = cleanOptions(clonedCfg?.skills);
    clonedCfg.birthDate = clonedCfg?.birthDate?.[0];
    clonedCfg.experienceYears = clonedCfg.experienceYears || undefined;

    return clonedCfg;
};

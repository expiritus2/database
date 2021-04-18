import { cloneDeep } from 'lodash-es';
import isUrl from 'is-url';

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
    // clonedCfg.place = clonedCfg?.place?.map(({ value }) => value);
    clonedCfg.birthDate = clonedCfg?.birthDate?.[0];
    clonedCfg.experienceYears = clonedCfg.experienceYears || undefined;

    return clonedCfg;
};

import { cloneDeep } from 'lodash-es';
import moment from 'moment';

export const prepareData = (cfg, files) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.files = [...(cfg?.files || []), ...(files?.files || [])];
    clonedCfg.photos = [...(cfg?.photos || []), ...(files?.photos || [])];
    clonedCfg.place = clonedCfg?.place?.map(({ value }) => value);
    clonedCfg.birthDate = moment(clonedCfg?.birthDate?.[0]).valueOf();
    clonedCfg.experienceYears = clonedCfg.experienceYears || undefined;

    return clonedCfg;
};

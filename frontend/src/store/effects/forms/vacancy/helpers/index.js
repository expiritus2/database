import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg, files) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.test = !(cfg?.test instanceof File) ? cfg?.test : files?.test?.[0];
    clonedCfg.files = [
        ...(cfg?.files.filter((file) => !file?.data).map((ph) => ph?.url || ph) || []),
        ...(files?.files || []),
    ];

    clonedCfg.users = (clonedCfg?.users || []).map((user) => user?.id);
    clonedCfg.company = clonedCfg?.company?.id;

    return clonedCfg;
};

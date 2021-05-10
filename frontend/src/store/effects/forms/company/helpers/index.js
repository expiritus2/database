import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg, file) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.logo = !(clonedCfg?.logo instanceof File) ? clonedCfg?.logo : file?.logo;
    clonedCfg.users = (clonedCfg?.users || []).map((user) => user?.id);

    return clonedCfg;
};

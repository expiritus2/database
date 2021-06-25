import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg) => {
    const clonedCfg = cloneDeep(cfg);

    return clonedCfg;
};

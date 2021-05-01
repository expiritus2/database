import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg, files) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.test = !(cfg?.test instanceof File) ? cfg?.test : files?.test?.[0];
    clonedCfg.files = [
        ...(cfg?.files.filter((file) => !file?.data).map((ph) => ph?.url || ph) || []),
        ...(files?.files || []),
    ];

    // clonedCfg.position = {
    //     id: clonedCfg?.position?.id,
    //     label: clonedCfg?.position?.label?.trim(),
    //     value: clonedCfg?.position?.value?.trim(),
    // };
    clonedCfg.users = (clonedCfg?.users || []).map((user) => user?.id);

    return clonedCfg;
};

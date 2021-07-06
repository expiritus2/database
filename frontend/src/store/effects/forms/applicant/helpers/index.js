import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.experienceYears = clonedCfg?.experienceYears || undefined;
    clonedCfg.birthDate = clonedCfg?.birthDate || undefined;

    if (clonedCfg?.salary) {
        clonedCfg.salary.amount = parseFloat(clonedCfg?.salary?.amount);
    }

    clonedCfg.languageSkills = (clonedCfg?.languageSkills || [])
        .filter((languageSkill) => !!languageSkill?.language);

    clonedCfg.phones = (clonedCfg?.phones || [])
        .filter((phone) => !!phone?.number);

    clonedCfg.experiences = (clonedCfg?.experiences || [])
        .filter((experience) => !!experience?.period && !!experience?.company);

    return clonedCfg;
};

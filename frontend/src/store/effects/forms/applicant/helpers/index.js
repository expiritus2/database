import { cloneDeep } from 'lodash-es';

export const prepareData = (cfg) => {
    const clonedCfg = cloneDeep(cfg);

    clonedCfg.experienceYears = clonedCfg?.experienceYears || undefined;
    clonedCfg.birthDate = clonedCfg?.birthDate || undefined;

    if (clonedCfg?.salary) {
        clonedCfg.salary.amount = Number(clonedCfg?.salary?.amount);
    }

    // clonedCfg.languageSkills = (clonedCfg?.languageSkills || [])
    //     .map((languageSkill) => ({ language: languageSkill.name, languageLevel: languageSkill.level }));

    return clonedCfg;
};

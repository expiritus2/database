import {
    EventTypes, LanguageLevels, Languages, LinkTypes, MessengersTypes, PhoneTypes,
    Positions, Regions, Skills, WorkPlaces, WorkSchedules, WorkTypes, Educations,
    Currencies, FileTypes, Sexs,
} from 'components/App/VocabularyModal/ModalContent/Tabs';

export const vocabularyTabsIds = {
    skills: 'skills',
    positions: 'positions',
    regions: 'regions',
    workTypes: 'workTypes',
    workPlaces: 'workPlaces',
    workSchedules: 'workSchedules',
    eventTypes: 'eventTypes',
    languages: 'languages',
    languageLevels: 'languageLevels',
    linkTypes: 'linkTypes',
    messengerTypes: 'messengerTypes',
    phoneTypes: 'phoneTypes',
    educations: 'educations',
    currencies: 'currencies',
    fileTypes: 'fileTypes',
    sexs: 'sexs',
};

export const getVocabularyTabs = (translate) => [
    { id: vocabularyTabsIds.skills, label: translate.Skills, Component: Skills },
    { id: vocabularyTabsIds.positions, label: translate.Position, Component: Positions },
    { id: vocabularyTabsIds.regions, label: translate.Regions, Component: Regions },
    { id: vocabularyTabsIds.workTypes, label: translate.WorkTypes, Component: WorkTypes },
    { id: vocabularyTabsIds.workPlaces, label: translate.WorkPlaces, Component: WorkPlaces },
    { id: vocabularyTabsIds.workSchedules, label: translate.WorkSchedule, Component: WorkSchedules },
    { id: vocabularyTabsIds.eventTypes, label: translate.EventTypes, Component: EventTypes },
    { id: vocabularyTabsIds.languages, label: translate.Languages, Component: Languages },
    { id: vocabularyTabsIds.languageLevels, label: translate.LanguageLevels, Component: LanguageLevels },
    { id: vocabularyTabsIds.linkTypes, label: translate.LinkTypes, Component: LinkTypes },
    { id: vocabularyTabsIds.messengerTypes, label: translate.MessengersTypes, Component: MessengersTypes },
    { id: vocabularyTabsIds.phoneTypes, label: translate.PhoneTypes, Component: PhoneTypes },
    { id: vocabularyTabsIds.educations, label: translate.Educations, Component: Educations },
    { id: vocabularyTabsIds.currencies, label: translate.Currencies, Component: Currencies },
    { id: vocabularyTabsIds.fileTypes, label: translate.FileTypes, Component: FileTypes },
    { id: vocabularyTabsIds.sexs, label: translate.Sex, Component: Sexs },
];

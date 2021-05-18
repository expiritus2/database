import {
    EventTypes, LanguageLevels, Languages, LinkTypes, MessengersTypes, PhoneTypes,
    Positions, Regions, Skills, WorkPlaces, WorkSchedules, WorkTypes,
} from 'components/App/VocabularyModal/ModalContent/Tabs';

export const vocabularyTabsIds = {
    skills: 'skills',
    positions: 'positions',
    regions: 'regions',
    workTypes: 'workTypes',
    places: 'places',
    workSchedules: 'workSchedules',
    eventTypes: 'eventTypes',
    languages: 'languages',
    languageLevels: 'languageLevels',
    linkTypes: 'linkTypes',
    messengersTypes: 'messengersTypes',
    phoneTypes: 'phoneTypes',
};

export const getVocabularyTabs = (translate) => [
    { id: vocabularyTabsIds.skills, label: translate.Skills, Component: Skills },
    { id: vocabularyTabsIds.positions, label: translate.Position, Component: Positions },
    { id: vocabularyTabsIds.regions, label: translate.Regions, Component: Regions },
    { id: vocabularyTabsIds.workTypes, label: translate.WorkTypes, Component: WorkTypes },
    { id: vocabularyTabsIds.places, label: translate.WorkPlaces, Component: WorkPlaces },
    { id: vocabularyTabsIds.workSchedules, label: translate.WorkSchedule, Component: WorkSchedules },
    { id: vocabularyTabsIds.eventTypes, label: translate.EventTypes, Component: EventTypes },
    { id: vocabularyTabsIds.languages, label: translate.Languages, Component: Languages },
    { id: vocabularyTabsIds.languageLevels, label: translate.LanguageLevels, Component: LanguageLevels },
    { id: vocabularyTabsIds.linkTypes, label: translate.LinkTypes, Component: LinkTypes },
    { id: vocabularyTabsIds.messengersTypes, label: translate.MessengersTypes, Component: MessengersTypes },
    { id: vocabularyTabsIds.phoneTypes, label: translate.PhoneTypes, Component: PhoneTypes },
];

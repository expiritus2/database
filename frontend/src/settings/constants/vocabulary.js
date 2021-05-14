import {
    EventTypes, LanguageLevels, Languages, LinkTypes, MessengersTypes, PhoneTypes,
    Position, Regions, Skills, WorkPlace, WorkSchedule, WorkTypes,
} from 'components/App/VocabularyModal/ModalContent/Tabs';

export const vocabularyTabsIds = {
    skills: 'skills',
    position: 'position',
    regions: 'regions',
    workTypes: 'workTypes',
    place: 'place',
    workSchedule: 'workSchedule',
    eventTypes: 'eventTypes',
    languages: 'languages',
    languageLevels: 'languageLevels',
    linkTypes: 'linkTypes',
    messengersTypes: 'messengersTypes',
    phoneTypes: 'phoneTypes',
};

export const getVocabularyTabs = (translate) => [
    { id: vocabularyTabsIds.skills, label: translate.Skills, Component: Skills },
    { id: vocabularyTabsIds.position, label: translate.Position, Component: Position },
    { id: vocabularyTabsIds.regions, label: translate.Regions, Component: Regions },
    { id: vocabularyTabsIds.workTypes, label: translate.WorkTypes, Component: WorkTypes },
    { id: vocabularyTabsIds.place, label: translate.WorkPlaces, Component: WorkPlace },
    { id: vocabularyTabsIds.workSchedule, label: translate.WorkSchedule, Component: WorkSchedule },
    { id: vocabularyTabsIds.eventTypes, label: translate.EventTypes, Component: EventTypes },
    { id: vocabularyTabsIds.languages, label: translate.Languages, Component: Languages },
    { id: vocabularyTabsIds.languageLevels, label: translate.LanguageLevels, Component: LanguageLevels },
    { id: vocabularyTabsIds.linkTypes, label: translate.LinkTypes, Component: LinkTypes },
    { id: vocabularyTabsIds.messengersTypes, label: translate.MessengersTypes, Component: MessengersTypes },
    { id: vocabularyTabsIds.phoneTypes, label: translate.PhoneTypes, Component: PhoneTypes },
];

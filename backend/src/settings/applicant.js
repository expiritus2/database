const VocabularyPosition = require('../models/vocabulary/position');
const VocabularySkill = require('../models/vocabulary/skill');
const VocabularyRegion = require('../models/vocabulary/region');
const VocabularyEducation = require('../models/vocabulary/education');
const VocabularySex = require('../models/vocabulary/sex');
const VocabularyMessengerType = require('../models/vocabulary/messengerType');
const VocabularyCurrency = require('../models/vocabulary/currency');
const VocabularyWorkPlace = require('../models/vocabulary/workPlace');
const VocabularyLanguage = require('../models/vocabulary/language');
const VocabularyLanguageLevel = require('../models/vocabulary/languageLevel');
const VocabularyPhoneType = require('../models/vocabulary/phoneType');
const VocabularyLinkType = require('../models/vocabulary/linkType');
const VocabularyFileType = require('../models/vocabulary/fileType');

const File = require('../models/file');
const Photo = require('../models/photo');
const Phone = require('../models/phone');
const Email = require('../models/email');
const Link = require('../models/link');
const Experience = require('../models/experience');
const Messenger = require('../models/messenger');
const Salary = require('../models/salary');
const LanguageSkill = require('../models/languageSkill');

const attributes = ['name', 'nameLat', 'inActiveSearch', 'experienceYears', 'info', 'birthDate', 'createdAt', 'updatedAt'];

const includeModels = [
    {
        model: VocabularyPosition,
        attributes: ['id', 'label', 'value'],
        through: { attributes: [] },
    },
    {
        model: VocabularySkill,
        attributes: ['id', 'label', 'value'],
        through: { attributes: [] },
    },
    {
        model: VocabularyRegion,
        attributes: ['id', 'label', 'value'],
        through: { attributes: [] },
    },
    {
        model: VocabularyEducation,
        attributes: ['id', 'label', 'value']
    },
    {
        model: VocabularySex,
        attributes: ['id', 'label', 'value'],
    },
    {
        model: VocabularyWorkPlace,
        attributes: ['id', 'label', 'value'],
        through: { attributes: [] },
    },
    {
        model: Photo,
        separate: true,
        attributes: ['id', 'contentType', 'filename', 'size', 'url'],
    },
    {
        model: File,
        separate: true,
        attributes: ['id', 'contentType', 'filename', 'size', 'url'],
        include: [
            {
                model: VocabularyFileType,
            }
        ]
    },
    {
        model: Link,
        attributes: ['id', 'link'],
        include: [
            {
                model: VocabularyLinkType,
                attributes: ['id', 'label', 'value'],
            }
        ]
    },
    {
        model: Phone,
        attributes: ['id', 'number'],
        include: [
            {
                model: VocabularyPhoneType,
                attributes: ['id', 'label', 'value'],
            }
        ]
    },
    {
        model: Email,
        separate: true,
        attributes: ['id', 'email']
    },
    {
        model: Salary,
        attributes: ['id', 'amount'],
        include: [
            { model: VocabularyCurrency }
        ]
    },
    {
        model: Messenger,
        separate: true,
        attributes: ['id', 'accountName'],
        include: [
            {
                model: VocabularyMessengerType,
                attributes: ['id', 'label', 'value'],
            }
        ]
    },
    {
        model: Experience,
        separate: true,
        attributes: ['id', 'company', 'period', 'info'],
        include: [
            {
                model: VocabularyPosition,
                attributes: ['id', 'label', 'value'],
                through: { attributes: [] }
            }
        ]
    },
    {
        model: LanguageSkill,
        attributes: ['id'],
        through: { attributes: [] },
        include: [
            {
                model: VocabularyLanguage,
                attributes: ['id', 'label', 'value'],
            },
            {
                model: VocabularyLanguageLevel,
                attributes: ['id', 'label', 'value'],
            }
        ]
    }
]

module.exports = {
    attributes,
    includeModels,
}
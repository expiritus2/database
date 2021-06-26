const VocabularyPosition = require('../models/vocabulary/position');
const VocabularySkill = require('../models/vocabulary/skill');
const VocabularyRegion = require('../models/vocabulary/region');
const VocabularyCurrency = require('../models/vocabulary/currency');
const VocabularyWorkPlace = require('../models/vocabulary/workPlace');
const VocabularyWorkSchedule = require('../models/vocabulary/workSchedule');
const VocabularyFileType = require('../models/vocabulary/fileType');

const User = require('../models/user');

const File = require('../models/file');
const SalaryRange = require('../models/salaryRange');

const attributesLight = ['id', 'active', 'experienceYears', 'createdAt', 'updatedAt'];
const attributesFull = [...attributesLight, 'info'];

const includeModelsLight = [
    {
        model: VocabularyPosition,
        attributes: ['id', 'label', 'value'],
    },
    {
        model: SalaryRange,
        attributes: ['id', 'min', 'max'],
        include: [
            { model: VocabularyCurrency }
        ]
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
]

const includeModelsFull = [
    ...includeModelsLight,
    {
        model: VocabularyWorkPlace,
        attributes: ['id', 'label', 'value'],
        through: { attributes: [] },
    },
    {
        model: VocabularyWorkSchedule,
        attributes: ['id', 'label', 'value'],
        through: { attributes: [] },
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
        model: User,
        attributes: ['id', 'email'],
        through: { attributes: [] },
    },
]

module.exports = {
    attributesLight,
    attributesFull,
    includeModelsLight,
    includeModelsFull,
}
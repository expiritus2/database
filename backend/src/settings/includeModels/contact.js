const VocabularyPosition = require('../../models/vocabulary/position');
const VocabularyPhoneType = require('../../models/vocabulary/phoneType');
const VocabularySex = require('../../models/vocabulary/sex');

const Company = require('../../models/company');
const Photo = require('../../models/photo');
const Phone = require('../../models/phone');
const Email = require('../../models/email');

const attributesLight = ['id', 'name', 'active', 'createdAt', 'updatedAt'];
const attributesFull = [...attributesLight, 'birthDate'];

const includeModelsLight = [
    {
        model: VocabularyPosition,
        attributes: ['id', 'label', 'value'],
    },
    {
        model: Company,
        attributes: ['id', 'name'],
    },
]

const includeModelsFull = [
    ...includeModelsLight,
    {
        model: Photo,
        attributes: ['id', 'contentType', 'filename', 'size', 'url'],
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
        model: VocabularySex,
        attributes: ['id', 'label', 'value'],
    },
]

module.exports = {
    attributesFull,
    attributesLight,
    includeModelsFull,
    includeModelsLight,
}
const VocabularyLinkType = require('../models/vocabulary/linkType');
const VocabularyActivity = require('../models/vocabulary/activity');
const VocabularyRegions = require('../models/vocabulary/region');

const Address = require('../models/address');

const Photo = require('../models/photo');
const Link = require('../models/link');
const User = require('../models/user');

const attributesLight = ['id', 'name', 'active', 'createdAt', 'updatedAt'];
const attributesFull = [...attributesLight, 'info'];

const includeModelsLight = []

const includeModelsFull = [
    ...includeModelsLight,
    {
        model: Photo,
        attributes: ['id', 'contentType', 'filename', 'size', 'url'],
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
        model: User,
        attributes: ['id', 'email'],
        through: { attributes: [] },
    },
    {
        model: VocabularyActivity,
        attributes: ['id', 'label', 'value'],
        through: { attributes: [] },
    },
    {
        model: VocabularyRegions,
        attributes: ['id', 'label', 'value'],
        through: { attributes: [] },
    },
    {
        model: Address,
        attributes: ['id', 'name'],
    },
]

module.exports = {
    attributesFull,
    attributesLight,
    includeModelsFull,
    includeModelsLight,
}
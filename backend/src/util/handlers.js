const { drop } = require('lodash');

function getPaginatedItems(items, page, pageSize) {
    const pg = page || 0;
    const pgSize = pageSize || 25;
    const offset = pg * pgSize;
    const pagedItems = drop(items, offset).slice(0, pgSize);

    return {
        page: pg,
        pageSize: pgSize,
        total: items.length,
        totalPages: Math.ceil(items.length / pgSize),
        pagedItems
    };
}

module.exports = {
    getPaginatedItems,
}
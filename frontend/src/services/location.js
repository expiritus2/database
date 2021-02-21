import queryString from 'query-string';

export class LocationService {
    /**
     *
     * @param location - location object
     */
    constructor(location = {}) {
        this.location = location;
    }

    /**
     *
     * @param location - location object
     */
    setLocation(location) {
        this.location = location;
    }

    /**
     *
     * @param options - rules for parsing
     * @returns {ParsedQuery<string | boolean | number>} - object with query params
     */
    getQuery(options = {}) {
        return queryString
            .parse(this.location.search, { parseNumbers: true, parseBooleans: true, ...options });
    }

    /**
     *
     * @param params - object with params to set to query string
     * @param options - rules for parsing existing or stringifying new query params
     * @returns {string} - url with query params
     */
    setQuery(params, options = {}) {
        const query = this.prepareSearch(params, options);
        return this.createUrlWithQuery(query);
    }

    /**
     *
     * @param params - object with params to set to query string
     * @param options - rules for parsing or stringifying query params
     * @returns {string} - string in query/search format ? is ignored
     */
    prepareSearch(params, options = {}) {
        if (!Object.keys(params || {}).length) {
            return '';
        }

        const search = this.getQuery(options);
        return queryString.stringify({ ...search, ...params }, { sort: false, ...options });
    }

    /**
     *
     * @param query - query/search string without ?
     * @returns {string} - url with query params
     */
    createUrlWithQuery(query) {
        return `${this.location.pathname}?${query}`;
    }
}

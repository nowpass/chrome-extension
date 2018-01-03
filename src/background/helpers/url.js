/**
 * Helper for URLs
 */
export default {
    name: 'url',

    /**
     * Get the parsed URL object for an string url
     *
     * @param url {string}
     * @returns {HTMLAnchorElement}
     */
    parse(url) {
        let parser = document.createElement('a');
        parser.href = url;

        return parser;
    }
}


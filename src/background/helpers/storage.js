/**
 * Storage helper object
 */
export default {
    name: 'storage',

    /**
     * Get the API Url out of the settings
     * @returns {*}
     */
    getApiUrl: function () {
        return this.get('apiUrl');
    },

    /**
     * Get the API key out of the settings
     * @returns {*}
     */
    getApiKey: function () {
        return this.get('apiKey');
    },

    /**
     * Get the passphrase (or temporary one)
     *
     * @returns {string}
     */
    getPassphrase: function () {
        let passphrase = this.get('passphrase');

        // Try to get the temporary one
        if (!passphrase) {
            passphrase = this.get('temporary_passphrase');
        }

        return passphrase;
    },

    /**
     * Get an item out of the local storage (wrapper around window.localStorage)
     *
     * @param key {string}
     * @param def {any}
     *
     * @returns {string}
     */
    get: function (key, def='') {
        let option = window.localStorage.getItem(key);

        if (option) {
            return option;
        }

        return def;
    },

    /**
     * Store an item in the local storage
     * @param key {string}
     * @param val {string}
     */
    set: function (key, val) {
        window.localStorage.setItem(key, val);
    }
}

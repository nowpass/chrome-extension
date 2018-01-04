/**
 * FormData helper object
 */
export default {
    name: 'formData',

    PASSWORD_REGEX: /pass|pw|passwort/gi,

    /**
     * Simple form data analyzes if it contains an password element
     * @param formData
     * @returns {*}
     */
    containsPassword(formData) {
        for (let key in formData) {
            if (this.PASSWORD_REGEX.test(key)) {
                return key;
            }
        }

        return false;
    }
}

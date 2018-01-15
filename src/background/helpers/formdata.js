/**
 * FormData helper object
 */
import {PASSWORD_REGEX} from "../../content/helpers/constants";

export default {
    name: 'formData',

    /**
     * Simple form data analyzes if it contains an password element
     * @param formData
     * @returns {*}
     */
    containsPassword(formData) {
        for (let key in formData) {
            if (PASSWORD_REGEX.test(key)) {
                return key;
            }
        }

        return false;
    }
}

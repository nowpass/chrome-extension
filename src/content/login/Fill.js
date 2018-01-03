/**
 * Workflow:
 *
 * - Try to insert the form data
 * - Check if we have a username in the login if yes
 * -> check if we have a preset
 * -> form find / analyze with element
 * - else insert only (if type password) -> password
 */

import formData from './FormData'
import userData from './UserData'
import passwordData from './PasswordData'

/**
 * Try to fill the form
 *
 * @param params
 * @returns {boolean}
 */
export default function(params) {
    let login = params.login;

    if (!login) {
        return false;
    }

    // We have a serialized form, that makes things easier
    let result = formData(params);

    if (result) {
        return true;
    }

    // We have a username, so two fields (at least to fill)
    result = userData(params);

    if (result) {
        return true;
    }

    // We just fill the element (Fallback)
    result = passwordData(params);

    return result;
}

/**
 * Workflow:
 *
 * - Try to insert the form data
 * - Check if we have a username in the login if yes
 * -> check if we have a preset
 * -> form find / analyze with element
 * - else insert only (if type password) -> password
 */

import userData from './UserData'
import passwordData from './PasswordData'

/**
 * Try to fill the form
 *
 * @param params {objecŧ}
 * @returns {boolean}
 */
export default function(params) {
    let login = params.login;

    if (!login) {
        return false;
    }

    // We have a username, so two fields (at least to fill)
    // First checks if we have form data, than checks if we have a preset for this site, than searches the DOM
    result = userData(params);

    if (result) {
        return true;
    }

    // We just fill the element (Fallback)
    result = passwordData(params);

    return result;
}

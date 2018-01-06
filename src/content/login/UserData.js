import presets from '../presets/common'
import domSearch from './DomSearch'

/**
 * Handle user data
 *
 * @param params {object}
 * @returns {boolean}
 */
export default function(params) {
    let login = params.login;

    // Try using the login form_data if any, else we try the preset (if any)
    // Presets are predefined templates, so we don't have to parse the page
    let preset = JSON.parse(login.form_data) || presets[login.host];

    if (preset) {
        let isUserFilled = false;
        let isPasswordFilled = false;

        if (preset.user) {
            isUserFilled = fillPreset(preset.user, login.username);
        }

        if (preset.password) {
            isPasswordFilled = fillPreset(preset.password, login.password)
        }

        // We are happy with that.. we should adjust
        if (isPasswordFilled) {
            return true;
        }
    }

    // Analyze
    let userElement = domSearch.searchUser(params);

    if (userElement) {
        userElement.value = login.username;
    }

    let passwordElement = domSearch.searchPassword(params);

    if (passwordElement) {
        passwordElement.value = login.password;

        return true;
    }

    // Not able to fill the form properly
    return false;
}

/**
 * Fill the preset
 *
 * @param elementInfo
 * @param value
 * @returns {boolean}
 */
function fillPreset(elementInfo, value) {
    try {
        if (elementInfo.id) {
            document.getElementById(elementInfo.id).value = value;

            return true;
        }

        if (elementInfo.name) {
            // We fill all fields matching that field
            let elements = document.getElementsByName(elementInfo.name);

            for (let i = 0; i < elements.length; i++) {
                elements[i].value = value;
            }

            return true;
        }

    } catch (exception) {
        // Ignore
        return false;
    }
}

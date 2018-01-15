/**
 * Dom search for Elements
 *
 * TODO add autocomplete="current-password" etc.
 */
import {USER_REGEX, PASSWORD_REGEX} from "../helpers/constants";

export default {
    /**
     * Search for a user input on the page (TODO merge with searchPassword)
     * @param params {object}
     * @returns {*}
     */
    searchUser: function (params) {
        let clickedElement = params.clickedElement;

        // Let's make a check if the clicked field is a username
        if (clickedElement.tag === 'INPUT' && clickedElement.type !== 'password') {
            // Chance of being the username
            let result = this.checkElement(clickedElement, USER_REGEX);

            if (result) {
                return result;
            }
        }

        // Okay it's not

        // Check if element is in a form
        if (clickedElement.tag === 'INPUT' && clickedElement.form) {
            let elements = document.forms[clickedElement.form].getElementsByTagName("input");

            for (let i = 0; i < elements.length; i++) {
                let result = this.checkElement(elements[i], USER_REGEX);

                if (result) {
                    return result;
                }
            }
        }

        // We have no form, so we have to get more intrusive
        let elements = document.getElementsByTagName('input');

        for (let i = 0; i < elements.length; i++) {
            let result = this.checkElement(elements[i], USER_REGEX);

            if (result) {
                return result;
            }
        }

        // Nothing
        return false;
    },

    /**
     * Search for a password field on the page
     * @param params {object}
     * @returns {*}
     */
    searchPassword: function (params) {
        let clickedElement = params.clickedElement;

        // Let's make a check if the clicked field is a username
        if (clickedElement.tag === 'INPUT' && clickedElement.type === 'password') {
            // Chance of being the username
            let result = this.checkElement(clickedElement, PASSWORD_REGEX);

            if (result) {
                return result;
            }
        }

        // Okay it's not

        // Check if element is in a form
        if (clickedElement.tag === 'INPUT' && clickedElement.form) {
            let elements = document.forms[clickedElement.form].getElementsByTagName("input");

            for (let i = 0; i < elements.length; i++) {
                let result = this.checkElement(elements[i], PASSWORD_REGEX);

                if (result) {
                    return result;
                }
            }
        }

        // We have no form, so we have to get more intrusive
        let elements = document.getElementsByTagName('input');

        for (let i = 0; i < elements.length; i++) {
            let result = this.checkElement(elements[i], PASSWORD_REGEX);

            if (result) {
                return result;
            }
        }

        return false;
    },

    /**
     * Check if the element is valid for our regex
     * @param element {object}
     * @param regex {RegExp}
     * @returns {*}
     */
    checkElement: function(element, regex) {
        // Test (TODO refactor into pattern)
        if (element.id && regex.test(element.id)) {
            return element;
        }

        if (element.name && regex.test(element.name)) {
            return element;
        }

        return false;
    }
}


import popup from '../helpers/popup'
import notify from "../../background/helpers/notification";

/**
 * Generator View
 */
export default class Generator {
    /**
     * Calls init();
     */
    constructor() {
        this.popup = popup;

        // Set up event listener
        this.init()
    }

    /**
     * Sets up the listeners for the Generator
     */
    init() {
        // Receive message for Login tasks
        chrome.runtime.onMessage.addListener(function(message, _, sendResponse) {
            console.log(message);

            if (message.task === 'generate') {
                let element = window.nowpass.clickedElement || document.activeElement;

                // Get generator iframe
                popup.showIframe(element, message.url)
            } else if (message.task === 'generatedInsert') {
                window.nowpass.generator.insert(message.generatedPassword);
            } else if (message.task === 'generatedClose') {
                // Close elements
                popup.closePopup();
            }
        });
    }

    /**
     * Inserts the generated password into the given field
     */
    insert(pass) {
        let clickedElement = window.nowpass.clickedElement || document.activeElement;

        let tag = clickedElement.tagName;

        if (tag === 'INPUT') {
            clickedElement.value = pass;
        } else if (tag === 'TEXTAREA') {
            clickedElement.innerHTML = pass;
        } else {
            console.log('Can not handle insert tag element ' + tag + ' for generated password.');
            // TODO show Notification
        }

        window.nowpass.clickedElement = null;
        this.popup.closePopup();
    }
}

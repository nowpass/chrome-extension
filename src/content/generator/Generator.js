import popup from '../helpers/popup'

/**
 * Generator View
 */
export default class Generator {
    /**
     * Calls init();
     */
    constructor() {
        this.popup = popup;
        this.clickedElement = null;

        // Set up event listener
        this.init()
    }

    /**
     * Sets up the listeners for the Generator
     */
    init() {
        // Receive message for Login tasks
        chrome.runtime.onMessage.addListener(function(message, _, sendResponse) {
            console.log("Requested Generator: " + JSON.stringify(message));

            let element = window.nowpass.clickedElement || document.activeElement;

            if (message.task === 'generate') {
                // Get generator iframe
                popup.showIframe(element, message.url)
            } else if (message.task === 'insert') {
                window.nowpass.generator.insert(message.generatedPassword);
            } else if (message.task === 'close') {
                // Close elements
                popup.closePopup();
            }
        });
    }

    /**
     * Inserts the generated password into the given field
     */
    insert() {

    }
}

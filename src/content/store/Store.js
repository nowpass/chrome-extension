import popup from '../helpers/popup'

export default class Store {
    /**
     * Constructor
     */
    constructor() {
        this.popup = popup;

        // Set up event listener
        this.init()
    }

    /**
     * Init the Listeners (called on construct)
     */
    init() {
        // Receive message for Login tasks
        chrome.runtime.onMessage.addListener(function(message, _, sendResponse) {
            if (message.task === 'storePopup') {
                // Show storing iframe
                popup.showIframe(null, message.url)
            } else if (message.task === 'storeClose') {
                popup.closePopup();
            }
        });
    }
}

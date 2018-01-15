import popup from '../helpers/popup'
import fillLogin from './Fill'

/**
 * Login Main Handler
 *
 * Workflow:
 * - chrome.runtime.onMessage is called with task elements and the url
 * - extension url is set
 * - ifFrame with extension url is shown
 * - user clicks in popup
 * - chrome.runtime.onMessage is called with insert and the login data
 * - popup is closed, login data is deleted
 */
export default class Login {
    /**
     * Constructor
     */
    constructor() {
        this.popup = popup;
        this.login = null;
        this.clickedElement = null;

        // Set up event listener
        this.init()
    }

    /**
     * Init the Listeners (called on construct)
     */
    init() {
        // Receive message for Login tasks from background
        chrome.runtime.onMessage.addListener(function(message, _, sendResponse) {
            let element = window.nowpass.clickedElement || document.activeElement;

            if (message.task === 'elements') {
                // Get elements iframe
                popup.showIframe(element, message.url)
            } else if (message.task === 'insert') {
                // Insert elements
                window.nowpass.login.setLogin(message.login);
                window.nowpass.login.insert();
            } else if (message.task === 'insertClose') {
                // Close elements
                popup.closePopup();
            }
        });
    }

    /**
     * Set the Login
     *
     * @param login {object}
     */
    setLogin(login) {
        this.login = login;
    }

    /**
     * Insert the Login (can consist of username + password or only password) into the form
     */
    insert() {
        fillLogin({
            login: this.login,
            clickedElement: window.nowpass.clickedElement || document.activeElement
        });

        // Delete login
        this.login = null;
        window.nowpass.clickedElement = null;
        this.popup.closePopup();
    }
}

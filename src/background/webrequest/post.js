import storage from '../helpers/storage'
import message from "../helpers/message";
import urlHelper from "../helpers/url";
import formDataHelper from "../helpers/formdata";

/**
 * Workflow:
 *
 * - We get a post request
 * - Check if the form has an password element
 * - Wait for page load
 * - Ask the user if he wants to save it (popup with iframe) -> on the next page
 *   -> Or to update (we check before if he has the passwords)
 * - Close popup (Frontend)
 */

/**
 * Handle a web request post event
 *
 * {"frameId":0,"initiator":"http://localhost","method":"POST","parentFrameId":-1,"requestBody":
 * {"formData":{"password":["root"],"user":["root"]}},"requestId":"45788","tabId":1434,
 * "timeStamp":1515061354850.19,"type":"main_frame","url":"http://localhost/test.php"}
 *
 * @param details
 */
export default {
    /**
     * Handle <any> post request and check it for passwords, if yes invoke pw save on the newly opened page
     *
     * @param details
     */
    post: function(details) {
        // We just handle post data
        if(details.method !== "POST") {
            return;
        }

        if (!storage.getPassphrase()) {
            return;
        }

        // Analyze the requestBody (if the form data contains a password)
        if (!formDataHelper.containsPassword(details.requestBody.formData)) {
            return;
        }

        // We temporary store the value, until the user decides what to do
        storage.set('lastPostRequest', JSON.stringify(details));
    },

    /**
     * If the user goes for storing, open an popup where they can store it
     */
    ready: function () {
        if (!storage.get('lastPostRequest')) {
            return;
        }

        try {
            let details = JSON.parse(storage.get('lastPostRequest'));

            let host = urlHelper.parse(details.url).host;

            // Sending store message (we have a lastPostRequest)

            // Handle
            message.sendMessage({
                task: 'storePopup',
                url: chrome.extension.getURL("views/start.html#/store/" + encodeURI(host))
            });
        } catch (err) {
            console.log('Could not take care of notification ' + url)

            // Clear storage, so error shows not up next load
            storage.set('lastPostRequest', '');
        }
    }
}

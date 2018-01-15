/**
 * Message helper object
 */
export default {
    name: 'message',

    /**
     * Send a message to the frontend (browser tab)
     *
     * @param message {object|string}
     * @param callback {function}
     */
    sendMessage: function (message, callback = () => {}) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            let lastTabId = tabs[0].id;
            chrome.tabs.sendMessage(lastTabId, message, callback);
        });
    },

    /**
     * Handle Message
     *
     * @param request {string}
     * @param sender {object}
     * @param sendResponse {function}
     * @returns {null}
     */
    handleMessage: function (request, sender, sendResponse) {
        return null;
    }
}
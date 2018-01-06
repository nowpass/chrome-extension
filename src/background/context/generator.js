import storage from '../helpers/storage'
import message from '../helpers/message'
import urlHelper from '../helpers/url'
import tabHelper from "../helpers/tab";
import notify from "../helpers/notification";

/**
 * Handle teh generator popup
 *
 * @param info {object}
 * @param tab {object}
 */
export default function (info, tab) {
    // The passphrase needs to be unlocked before we can insert an element
    if (!tabHelper.hasPassphraseOrShowUnlock()) {
        return;
    }

    try {
        // Handle
        message.sendMessage({
            task: 'generate',
            url: chrome.extension.getURL("views/start.html#/generate")
        });
    } catch (err) {
        notify.show('Error loading', 'Loading Generator failed: ' + JSON.stringify(err));
    }
}

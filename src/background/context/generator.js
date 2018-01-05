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

    let url = info.pageUrl;

    try {
        let host = urlHelper.parse(url).host;

        // Handle
        message.sendMessage({
            task: 'generate',
            url: chrome.extension.getURL("views/start.html#/generate/" + encodeURI(host))
        });
    } catch (err) {
        console.log('Could not take care of request ' + url);
        notify.show('Error loading', 'Loading Generator failed: ' + JSON.stringify(err));
    }
}

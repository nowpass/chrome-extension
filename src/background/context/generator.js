import storage from '../helpers/storage'
import message from '../helpers/message'
import urlHelper from '../helpers/url'

/**
 * Handle teh generator popup
 *
 * @param info {object}
 * @param tab {object}
 */
export default function (info, tab) {
    let passphrase = storage.getPassphrase();

    if (!passphrase) {
        focusOrCreateTab(chrome.extension.getURL("views/start.html#/unlock"));

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
        console.log('Could not take care of request ' + url)
    }
}

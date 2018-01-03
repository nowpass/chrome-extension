import storage from '../helpers/storage'
import urlHelper from '../helpers/url'

/**
 * Handle storing selected text secure not
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

    console.log('TODO');
}

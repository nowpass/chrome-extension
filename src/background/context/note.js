import storage from '../helpers/storage'
import notify from '../helpers/notification'
import encrypt from '../helpers/encrypt'

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

    let selectedText = info.selectionText;

    if (!selectedText) {
        notify.show('No text selected!', 'You have to select the text you want to store!');

        return;
    }

    // TODO move to element creation
    let note = {
        group: '',
        title: '',
        url: encodeURI(info.pageUrl),
        content: encrypt(selectedText, passphrase),
        status: 1
    };

    // Send Post TODO outsource to API wrapper
    let url = storage.getApiUrl() + '/api/v1/notes';

    axios.defaults.headers['Content-Type'] = 'application/vnd.api+json';
    axios.defaults.headers['Accept'] = 'application/vnd.api+json';

    axios({
        method: 'post',
        url: url,
        headers: {'api-key': storage.getApiKey()},
        data: JSON.stringify(note)
    }).then(function (response) {
        notify.show('Secure Note saved', 'Your secure note has been successfully stored in your Vault.')
    }).catch(function (error) {
        // TODO handle error
        notify.show('Error saving note', 'Your secure note could not be stored.');
        console.log(error);
    });

}

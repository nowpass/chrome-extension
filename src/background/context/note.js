import storage from '../helpers/storage'
import notify from '../helpers/notification'
import encrypt from '../helpers/encrypt'
import tabHelper from "../helpers/tab";

/**
 * Handle storing selected text secure not
 *
 * @param info {object}
 * @param tab {object}
 */
export default function (info, tab) {
    // The passphrase needs to be unlocked before we can insert an element
    if (!tabHelper.hasPassphraseOrShowUnlock()) {
        return;
    }

    let selectedText = info.selectionText;

    if (!selectedText) {
        notify.show('No text selected!', 'You have to select the text you want to store!');

        return;
    }

    let passphrase = storage.getPassphrase();

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
        notify.show('Error saving note', 'Your secure note could not be stored.');
        console.log(error);
    });

}

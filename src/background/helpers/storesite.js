import storage from "./storage";
import notify from "./notification";

export default function (siteUrl) {
    let website = {
        url: siteUrl,
        tags: '',
        status: 1
    };

    // Send Post TODO outsource to API wrapper
    let url = storage.getApiUrl() + '/api/v1/sites';

    axios.defaults.headers['Content-Type'] = 'application/vnd.api+json';
    axios.defaults.headers['Accept'] = 'application/vnd.api+json';

    axios({
        method: 'post',
        url: url,
        headers: {'api-key': storage.getApiKey()},
        data: JSON.stringify(website)
    }).then(function (response) {
        notify.show('Website saved', 'The website URL has been saved.')
    }).catch(function (error) {
        notify.show('Error saving Website', 'Your website URL could not be stored.');
        console.log(error);
    });
}

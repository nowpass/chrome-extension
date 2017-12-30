var apiVersion = 'v1';

// Simple API routes (TODO Outsource)
var nowApi = {
    // Login
    PUT_LOGIN: 'api/' + apiVersion + '/entrance/login',

    // Elements
    GET_ELEMENTS: 'api/' + apiVersion + '/elements',

    /**
     * Login a user and resolve in calling the callback method with an success full result
     *
     * @param callback
     * @param apiServer
     * @param apiEmail
     * @param apiPassword
     */
    getApiKey: function (callback, apiServer, apiEmail, apiPassword) {
        $ = jQuery;

        var payload = {
            emailAddress: apiEmail,
            password: apiPassword
        };

        $.ajax({
            method: 'PUT',
            url: apiServer + '/' + nowApi.PUT_LOGIN,
            data: payload,
            dataType: 'json',
            crossDomain: true
        })
        .done(callback)
        .fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            console.log('Error logging in ' + textStatus);
        })
    },

    getElements: function (resolve, fail, options) {
        $ = jQuery;

        $.ajax({
            method: 'GET',
            url: options.apiServer + '/' + nowApi.GET_ELEMENTS,
            dataType: 'json',
            crossDomain: true,
            beforeSend: function(request) {
                request.setRequestHeader("api-key", options.apiKey);
            },
        })
        .done(resolve)
        .fail(fail);
    }
};

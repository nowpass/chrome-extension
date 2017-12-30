/**
 * Copyright (c) 2010 The Chromium Authors. All rights reserved.  Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

jQuery(document).ready(function ($) {
    var inputApiUrl = $('#api-url');
    var inputApiEmail = $('#api-email');
    var inputApiPassword = $('#api-password');
    var radioStorePassphrase = $('[name="passphrase-store"]');
    var inputPassphrase = $('#passphrase');

    function save() {
        // Login and get the ajax key
        nowApi.getApiKey(storeOptions, inputApiUrl.val(), inputApiEmail.val(), inputApiPassword.val());
    }

    function storeOptions(result) {
        $ = jQuery;

        var options = {
            apiServer: inputApiUrl.val(),
            apiEmail: inputApiEmail.val(),
            apiPassword: inputApiPassword.val(),
            passphrase: inputPassphrase.val(),
            apiKey: result.apiKey,
        };

        window.localStorage.setItem('options', JSON.stringify(options));
    }

    /**
     * Initializes the options page
     */
    function initialize() {
        setOptionPageCSS();
        localize();
        loadOptions();

        $('#btn-save').click(function (ev) {
            ev.preventDefault();
            save();
        });
    }

    /**
     * Sets options page CSS according to the browser language(if found), else sets
     * to default locale.
     */
    function setOptionPageCSS() {
        if (chrome.i18n.getMessage('direction') == 'rtl') {
            document.querySelector('body').className = 'rtl';
        }
    }


    function loadOptions() {
        var options = JSON.parse(window.localStorage.getItem('options'));

        if (!options) {
            loadDefaultValues();

            return;
        }

        inputApiUrl.val(options.apiServer);
        inputApiEmail.val(options.apiEmail);
        inputApiPassword.val(options.apiPassword);
        inputPassphrase.val(options.passphrase);
    }

    function loadDefaultValues() {
        $('api-url').val('http://localhost:1337');
    }

    /**
     * Retrieves locale values from locale file.
     */
    function localize() {
        $ = jQuery;

        var getI18nMsg = chrome.i18n.getMessage;

        $('#logo').html($('#logo').innerHTML + getI18nMsg('nowpassOption'));
        $('#label-api-url').html(getI18nMsg('apiUrl'));
        $('#label-api-email').html(getI18nMsg('apiEmail'));
        $('#label-api-password').html(getI18nMsg('apiPassword'));
        $('#label-store-passphrase').html(getI18nMsg('storePassphrase'));
        $('#label-passphrase').html(getI18nMsg('passphrase'));

        $('#btn-save').html(getI18nMsg('save'));
    }


    initialize();
});

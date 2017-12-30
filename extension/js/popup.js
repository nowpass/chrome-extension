// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

jQuery(document).ready(function ($) {
    var options = JSON.parse(window.localStorage.getItem('options'));

    var apiServer = options.apiServer;
    var apiKey = options.apiKey;

    console.log(options);

    function isLoggedIn() {
        if (!options && !options.apiKey) {
            return false;
        }

        return true;
    }

    function printElements(result) {
        var elements = result['elements'];

        var $draft = $('#password-draft');
        var $container = $('#passwords');

        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var $newElement = $draft.clone();

            $newElement.attr('id', 'password-' + i);

            $newElement.appendTo($container);
        }
    }

    function printError(xhr, error) {
        console.log('Error ' + error);
        console.log(xhr);
    }

    // Start

    if (!isLoggedIn()) {
        console.log('User is not logged in.');

        // TODO show error

        return;
    }

    // Draw the elements (async)
    nowApi.getElements(printElements, printError, options);
});


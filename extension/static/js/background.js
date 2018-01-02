// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// On start clear temporary one
chrome.runtime.onStartup.addListener(function() {
    chrome.storage.localStorage.setItem('temporary_passphrase', '')
});

// State
var passphrase = null;

function loadPassphrase() {
    passphrase = window.localStorage.getItem('passphrase');

    // Try to get the temporary one
    if (!passphrase) {
        passphrase = window.localStorage.getItem('temporary_passphrase');
    }
}

loadPassphrase();


// Runtime initialization
/**
 * Send a message to the tab
 */
function sendMessage(message) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        lastTabId = tabs[0].id;
        chrome.tabs.sendMessage(lastTabId, message);
    });
}

/**
 * Get the request from the js and deliver the settings
 *
 * @param request
 * @param sender
 * @param sendResponse
 * @returns {*}
 */
function handleMessage(request, sender, sendResponse) {
    console.log('HANDLER CALLED');
    console.log(request);

    if (request.task === 'getElements') {
        console.log('req ' + JSON.stringify(request));
        console.log('sender ' + JSON.stringify(sender));
        console.log('resp ' + JSON.stringify(sendResponse));

        sendResponse("Back from background");

        return true;
    }

    return null;
}

if (chrome.runtime.onInstalled) {
    chrome.runtime.onInstalled.addListener((details) => {
        if (details.reason === 'getElements') {
            console.log('LISTENER called');
            console.log(details);
        }
    });
}

chrome.runtime.onMessage.addListener(handleMessage);

// Context menu
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    // Refresh storage
    loadPassphrase();

    // Check if we have a passphrase
    if (!passphrase) {
        focusOrCreateTab(chrome.extension.getURL("views/start.html#/unlock"));

        return;
    }

    let url = info.pageUrl;

    console.log('Loading items for ' + url);
    console.log("onClicked " + JSON.stringify(info));

    axios({
        method: 'get',
        url: 'http://localhost:1337/api/v1/elements',
    }).then(function (response) {
        console.log(response);
        sendMessage({
            message: 'WIth love from axios'
        });
    }).catch(function (error) {
        console.log(error);
    });
});

// Context methods

function storeEncryptedText(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
}

function insertLogin(info, tab) {
    console.log("later");
}

function generatePassword(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
}

/**
 * Focus or create a new tab
 * @param url
 */
function focusOrCreateTab(url) {
    chrome.windows.getAll({"populate":true}, function(windows) {
        let existingTab = null;

        for (let i in windows) {
            let tabs = windows[i].tabs;

            for (let j in tabs) {
                let tab = tabs[j];

                if (tab.url === url) {
                    existingTab = tab;
                    break;
                }
            }
        }

        if (existingTab) {
            chrome.tabs.update(existingTab.id, {"selected": true})
            return;
        }

        chrome.tabs.create({"url": url, "selected": true});
    });
}

function showNowpass(info, tab) {
    // Goto main URL (TODO add page URL)
    focusOrCreateTab(chrome.extension.getURL("views/start.html#/"));
}

var selectionTitle = 'Store selected text (encrypted)';
var selectionElement = chrome.contextMenus.create({
    "title": selectionTitle,
    "contexts": ['selection'],
    "onclick": storeEncryptedText
});


var insertTitle = 'Insert login';
var insertElement = chrome.contextMenus.create({
    "title": insertTitle,
    "contexts": ['editable'],
    "onclick": insertLogin
});

var generateTitle = 'Generate password';
var generateElement = chrome.contextMenus.create({
    "title": generateTitle,
    "contexts": ['editable'],
    "onclick": generatePassword
});

var showTitle = "Show nowpass";
var showElement = chrome.contextMenus.create({
    "title": showTitle,
    "contexts": ['page'],
    "onclick": showNowpass
});

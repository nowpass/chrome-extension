import handleEditable from './context/editable'
import handleGenerate from './context/generator'
import handleNote from './context/note'

import handlerPost from './webrequest/post'
import tabHelper from './helpers/tab'

import handleSiteStore from './helpers/storesite'

// Make sure temporary passphrase is cleaned
chrome.runtime.onStartup.addListener(function () {
    window.localStorage.setItem('temporary_passphrase', '')
});

/*--------Context-Menus--------*/

// Nowpass menu on editable
chrome.contextMenus.create({
    "title": 'nowpass',
    "contexts": ['editable'],
    "id": 'editableInsertNowpass'
});

/* Show different task, selectable */
// Login
chrome.contextMenus.create({
    "title": "Insert Login",
    "contexts": ['editable'],
    'parentId': 'editableInsertNowpass',
    'onclick': handleEditable
});

// Generate
chrome.contextMenus.create({
    "title": "Generate Password",
    "contexts": ['editable'],
    'parentId': 'editableInsertNowpass',
    'onclick': handleGenerate
});

// Secure Note
chrome.contextMenus.create({
    "title": 'Store selected text (encrypted)',
    "contexts": ['selection'],
    "onclick": handleNote
});


/* General nowpass menu */
chrome.contextMenus.create({
    "title": "Open nowpass",
    "contexts": ['page'],
    "onclick": () => {
        tabHelper.focusOrCreateTab(chrome.extension.getURL("views/start.html#/"))
    }
});

/*--------End Context------------*/

/* The Web Request API */
const webRequest = chrome.webRequest;

// Handle password post / login
webRequest.onBeforeRequest.addListener(
    handlerPost.post,
    {urls: ["<all_urls>"]},
    ["requestBody"]
);

/* Passing messages from backend to frontend, in certain browsers chrome.tabs is not available in iframes */
chrome.runtime.onMessage.addListener(function (request, sender) {
    // We have to show the store password dialog (on the next page after post)
    if (request.type === 'notification' && request.options.message === 'ready') {
        handlerPost.ready();
    }

    // We have to close the popup (this has been scheduled over the popup -> backend -> frontend
    if (request.type === 'notification' && request.options.message.task === 'insertClose') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let lastTabId = tabs[0].id;
            chrome.tabs.sendMessage(lastTabId, {
                task: 'insertClose',
            });
        });
    }

    if (request.type === 'notification' && request.options.message.task === 'insert') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let lastTabId = tabs[0].id;
            chrome.tabs.sendMessage(lastTabId, request.options.message);
        });
    }

    if (request.type === 'notification' && request.options.message.task === 'generatedClose') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let lastTabId = tabs[0].id;
            chrome.tabs.sendMessage(lastTabId, {
                task: 'generatedClose',
            });
        });
    }

    if (request.type === 'notification' && request.options.message.task === 'generatedInsert') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let lastTabId = tabs[0].id;
            chrome.tabs.sendMessage(lastTabId, {
                task: 'generatedInsert',
                generatedPassword: request.options.message.generatedPassword
            });
        });
    }

    if (request.type === 'notification' && request.options.message.task === 'storeClose') {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let lastTabId = tabs[0].id;
            chrome.tabs.sendMessage(lastTabId, {
                task: 'storeClose'
            });
        });
    }

    // Store website URL
    if (request.type === 'notification' && request.options.message.task === 'storeSite') {
        console.log('Storing current website!');
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            let siteUrl = tabs[0].url;
            handleSiteStore(siteUrl);
        });
    }
});

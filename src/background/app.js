import handleEditable from './context/editable'
import handleGenerate from './context/generator'
import handleNote from './context/note'

import handlerPost from './webrequest/post'

import tabHelper from './helpers/tab'

// Make sure temporary passphrase is cleaned
chrome.runtime.onStartup.addListener(function () {
    chrome.storage.localStorage.setItem('temporary_passphrase', '')
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

chrome.runtime.onMessage.addListener(function (request, sender) {
    // We have to show the post
    if (request.type === 'notification' && request.options.message === 'ready') {
        handlerPost.ready();
    }
});

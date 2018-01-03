import handleEditable from './context/editable'
import handleGenerate from './context/generator'
import handleNote from './context/note'

import tabHelper from './helpers/tab'

// Make sure temporary passphrase is cleaned
chrome.runtime.onStartup.addListener(function() {
    chrome.storage.localStorage.setItem('temporary_passphrase', '')
});

/*--------Context-Menus--------*/

// Nowpass menu on editable
chrome.contextMenus.create({
    "title": 'nowpass',
    "contexts": ['editable'],
    "id": 'editableInsert'
});

/* Show different task, selectable */
// Login
chrome.contextMenus.create({
    "title": "Insert Login",
    "contexts": ['editable'],
    'parentId': 'editableInsert',
    'onclick': handleEditable
});

// Generate
chrome.contextMenus.create({
    "title": "Generate Password",
    "contexts": ['editable'],
    'parentId': 'editableInsert',
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
    "onclick": () => {tabHelper.focusOrCreateTab(chrome.extension.getURL("views/start.html#/"))}
});

/*--------End Context------------*/


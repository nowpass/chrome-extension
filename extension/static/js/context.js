// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function genericOnClick(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}

function storeEncryptedText(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
}

function insertLogin(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
}

function generatePassword(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
}

function showNowpass(info, tab) {
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
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

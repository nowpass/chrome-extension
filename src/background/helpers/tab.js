import storage from "./storage";

/**
 * Tab Helpers
 */
export default {
    name: 'tab',

    /**
     * Focus or create a new tab with the given URL
     * @async
     * @param url {string}
     */
    focusOrCreateTab: function (url) {
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
    },

    hasPassphraseOrShowUnlock: function () {
        if (!storage.getPassphrase()) {
            this.focusOrCreateTab(chrome.extension.getURL("views/start.html#/unlock"));

            return false;
        }

        return true;
    }
}

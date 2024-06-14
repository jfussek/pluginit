
// ... because Chromium and Firefox/Safari use different namespaces
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities
const browserContext = typeof chrome === 'undefined' ? browser : chrome;

/**
 * Message Passing
 */
browserContext.runtime.onMessage.addListener((msg, sender, callback) => {
    if (false) {
        // replace false with a check on the parameters in `msg`, and insert handling here
    } else {
        reply('unknown message sent to service worker');
    }
});

/**
 * Context Menus
 * https://developer.chrome.com/docs/extensions/reference/api/contextMenus
 * Must be defined in the service worker, not a content script. But the details can be done in the content script via message passing.
 */

browserContext.contextMenus.onClicked.addListener( ( menuItem ) => {
    browserContext.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        try {
            browserContext.tabs.sendMessage(tabs[0].id, menuItem).catch(ex => null);
        } catch (ex) {
            // do nothing, just because we did this above.
        }
    })
});

browserContext.runtime.onInstalled.addListener(() => {
    // create your own context menus here
    browserContext.contextMenus.create({
        id: "contextMenuId",
        title: "Context Menu Title",
        contexts: ["all"]
    });
});


const browserContext = typeof chrome === 'undefined' ? browser : chrome;

browserContext.runtime.onMessage.addListener((msg, sender, callback) => {
    // fill this with background handling
});

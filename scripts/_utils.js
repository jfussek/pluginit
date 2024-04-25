
/**
 *
 * @param {*} name feature name
 * @param {*} label the label to use in the plugin popup
 * @param {*} condition function returning true if the callback is to be executed
 *              - an optional object is passed in, and it can be used to pass data to the callback
 * @param {*} callback function to execute when the condition is met
 *              - an optional object is passed in, containing whatever data was set in the condition function
 * @param {*} timingOptions support customizing the timing on condition check executions
 *              - retries (default 10): how many times is the condition checked
 *              - delay (default 500): how many milliseconds between retries
 */

function installEnablableFeatureWithCondition(name, label, condition, callback, timingOptions) {
	const retries = timingOptions && timingOptions.retries || 10;
	const delay = timingOptions && timingOptions.delay || 500;

    if (name === 'installedFeatures') throw new Error(`Don't name the feature with a reserved name: ${name}`);

    chrome.storage.local.get(['installedFeatures', name], (result) => {
        var installedFeatures = [];
        if (result['installedFeatures']) {
            installedFeatures = result['installedFeatures'];
        }

        // check if the feature is already installed
        // NOTE: this variable is used in `runOrWait` to record the last usage time
        var thisFeature = installedFeatures.find(f => f.name === name);
        if (thisFeature) {
            if (!thisFeature.enabled) {
                // if this feature is already installed, and not enabled, don't do anything
                return;
            }
        } else {
            // register the feature if it's the first time running
            thisFeature = { name, label, enabled: true, lastUsed: (new Date()).toLocaleString() };
            installedFeatures.push(thisFeature);
            chrome.storage.local.set({ installedFeatures: installedFeatures });

            // proceed to running this feature, without waiting for the installation to register
        }

		const runOrWait = (remainingRetries) => {
			if (remainingRetries > 0) {
				setTimeout(function() {
					const transferToCallback = {
						// empty object to be filled by condition call and passed to callback
					}
					if (condition(transferToCallback)) {
						callback(transferToCallback);

                        // register last usage of the feature
                        thisFeature.lastUsed = (new Date()).toLocaleString();
                        chrome.storage.local.set({ installedFeatures: installedFeatures });
					} else {
						runOrWait(remainingRetries-1);
					}
				}, delay);
			} else {
				// condition hasn't been met and we're out of retries -- nothing to do
			}
		}

        // first run of the retry loop
        runOrWait(retries)
	});
}
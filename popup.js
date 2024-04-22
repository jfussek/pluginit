
document.addEventListener('DOMContentLoaded', () => {

    // dynamically fill the feature list
    chrome.storage.local.get(['installedFeatures'], (result) => {
        if (!result['installedFeatures']) return;

        const featureList = document.querySelector('#feature_list');

        result['installedFeatures'].forEach(({ name, label, enabled, lastUsed }) => {

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = name;
            checkbox.checked = enabled;

            // add handler for checking/unchecking (ie: enabling/disabling) the feature
            checkbox.addEventListener('change', () => {
                result['installedFeatures'].forEach((feature) => {
                    if (feature.name === name) {
                        feature.enabled = checkbox.checked;
                    }
                });
                chrome.storage.local.set({ installedFeatures: result['installedFeatures'] });
            });

            const labelHTML = `<label>${label}</label> (<i>${lastUsed}</i>)`;

            const span = document.createElement('span');
            span.innerHTML = labelHTML;

            const li = document.createElement('li');
            li.appendChild(checkbox);
            li.appendChild(span);

            featureList.appendChild(li);
        });
    });
});

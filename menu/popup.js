
const browserContext = typeof chrome === 'undefined' ? browser : chrome;

document.addEventListener('DOMContentLoaded', () => {

    // dynamically fill the feature list
    browserContext.storage.local.get(['installedFeatures'], (result) => {
        if (!result['installedFeatures']) return;

        const featureList = document.querySelector('#feature_list');

        result['installedFeatures'].forEach(({ name, label, enabled, lastUsed }) => {

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = name;
            checkbox.checked = enabled;

            // add handler for checking/unchecking (ie: enabling/disabling) the feature
            checkbox.addEventListener('click', () => {
                result['installedFeatures'].forEach((feature) => {
                    if (feature.name === name) {
                        feature.enabled = checkbox.checked;
                    }
                });
                browserContext.storage.local.set({ installedFeatures: result['installedFeatures'] });
            });

            const checkboxCell = document.createElement('td');
            checkboxCell.style.textAlign = 'center';
            checkboxCell.appendChild(checkbox);

            const labelCell = document.createElement('td');
            labelCell.style.textAlign = 'left';
            labelCell.innerHTML = `<label>${label}</label>`;

            const lastUsedCell = document.createElement('td');
            lastUsedCell.style.textAlign = 'right';
            lastUsedCell.innerHTML = `<i>${lastUsed}</i>`;

            const row = document.createElement('tr');
            row.appendChild(checkboxCell);
            row.appendChild(labelCell);
            row.appendChild(lastUsedCell);

            featureList.appendChild(row);
        });
    });
});

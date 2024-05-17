
/**
 * This content script removes certain search results from Google search results, based on the domain.
 * This is just an example of how to use `installEnablableFeatureWithCondition`, especially the condition
 * and actual feature functions, and how to pass data between them.
 */

installEnablableFeatureWithCondition(
    'clean-google-search',
    'Remove certain results from Google search results',
    (obj) => {
        // list of sites to be removed from search results
        const sitesToRemove = [
            "https://www.w3schools.com",
            "https://www.javatpoint.com",
            "https://www.programiz.com"
        ];

        const hits = [];

        // determine if any search results are from these sites
        document.querySelectorAll('cite').forEach(cite => {
            const url = cite.innerText;
            if (sitesToRemove.some(site => url.includes(site))) {
                hits.push(cite);
            }
        });

        if (hits.length > 0) {
            obj.hits = hits;
            return true;
        } else {
            // return `false` means this will be retried again up to the retry limit, then give up
            return false;
        }
    },
    (obj) => {
        // for each hit, find the ancestral element whose parent has the id `rso`
        obj.hits.forEach(hit => {
            let current = hit;
            while (current && current.parentElement) {
                if (current.parentElement.id === 'rso') {
                    highlightElement(current, 'red');
                    current.innerText = "This result has been removed by the extension";
                    break;
                }
                current = current.parentElement;
            }
        });
    }
)


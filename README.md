# Pluginit -- Init Your Plugin

Building your own Chrome/Edge browser plugin is easy. Get started here.

# Getting Started

1) Clone this repo locally
2) Open up "Manage Extensions" in your browser
   - Edge: edge://extensions/
   - Chrome: chrome://extensions/
3) Enable "Developer mode" toggle
   - Edge: left side, middle of the screen
   - Chrome: top right
4) Click the "Load unpacked" button
   - Edge: top right
   - Chrome: top left
5) Find this repo locally, and select the root repo folder

That's it. The plugin is installed.
You are now greeted with a "hello world" alert on the Google home page.
Try it: https://www.google.com/

To disable the plugin, go back to "Manage Extensions" and disable or remove this plugin ("My Plugin Title").
To update the plugin, go back to "Manage Extensions" and click "Reload".

# What Have We Got Here

- `manifest.json`
  - Manage the extension
- `icons/lock.png`
  - Sample icon for the plugin
- `scripts/hello_world.js`
  - The content script throwing that "hello world" alert
- `scripts/_utils.js`
  - Some helper functions you might want to use in your scripts. This file is matched to `<all_urls>` so it's available for all content scripts.
- `action/popup.html`
  - The plugin popup HTML (it's Javascript file is sibling)
  - The content of the feature list is dynamically populated from the content scripts, if you use the helper function `installEnablableFeatureWithCondition`

# Next Steps

There are many good tutorials online. Here's one from Chrome: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world.

# Documentation

- The manifest file has the following sections:
  - `permissions`: https://developer.chrome.com/docs/extensions/reference/permissions-list
    - defines what the plugin is allowed to do. Since this is your own plugin, do whatever you want!
  - `action`: https://developer.chrome.com/docs/extensions/reference/api/action
    - `default_popup` is a relative path to an HTML file shown when your plugin icon is clicked.
  - `background`: https://developer.chrome.com/docs/extensions/reference/manifest/background
    - `service_worker` is a relative path to a JavaScript file with your background scripts (across URLs)
      - this is where event handling is managed
      - https://developer.chrome.com/docs/extensions/develop/concepts/service-workers#manifest
  - `content_scripts`: https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts
    - this is a mapping of scripts to URLs on which they run
      - matching: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns
        - one notable limitation: you must have a path (cannot match a root domain)




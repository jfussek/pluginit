# Pluginit -- Init Your Plugin

<!--
<img src="https://edgestatic.azureedge.net/shared/cms/lrs1c69a1j/logos/5a74283229e24d0ca59fb94ed941c3a0.png" width=50 style="float:right"/>
<img src="https://www.google.com/chrome/static/images/chrome-logo-m100.svg" width=50 style="float:right"/>
<img src="https://www.mozilla.org/media/protocol/img/logos/firefox/browser/developer/logo.41d42822c8fb.svg" width=50 style="float:right"/>
<img src="https://brave.com/static-assets/images/brave-logo-sans-text.svg" width=40 style="float:right"/>
-->

Building your own browser plugin is easy (*). Get started here.

**Supported Browsers**: Edge, Chrome, Brave, Firefox

_(*) It wouldn't be browser development if there weren't browser differences!_

# Getting Started with Chromium-based Browsers

1) Clone this repo locally
2) Open up "Manage Extensions" in your browser
   - Edge: `edge://extensions/`
   - Chrome: `chrome://extensions/`
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

# Getting Started with Firefox

Note: things are far more messy with Firefox...
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities

### Configuring for active development

Note: Using this approach, Firefox will not keep the plugin installed after a browser restart. This is useful when actively developing the plugin. But it's not a good long-term solution.

1) Clone this repo locally
2) Delete (or rename) `manifest.json` and rename `manifest-firefox.json` to `manifest.json`
    - Firefox requires a slightly different manifest file
3) Open up "Manage Extensions" in your browser
    - Firefox: `about:addons`
4) Open "Debug Add-ons"
    - Click the cog icon, top right, and click "Debug Add-ons"
5) Click the "Load Temporary Add-on" button
    - Firefox: top right
6) Find this repo locally, and select the newly-renamed `manifest.json` file
7) Go back to "Manage Extensions", and click on the plugin
8) Open the "Permissions" tab, and toggle "Access your data for all websites"

And there you have it: the plugin is installed.
You are now greeted with a "hello world" alert on the Google home page.
Try it: https://www.google.com/

To update the plugin, go back to "Debug Add-ons", and click "Reload" button on this plugin.

### Configuring for usage rather than development

Note: this [will not work with mainstream Firefox](https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox#w_what-are-my-options-if-i-want-to-use-an-unsigned-add-on-advanced-users); use [Developer Edition](https://www.mozilla.org/en-CA/firefox/developer/).

To install the plugin more permanently (assuming you've already cloned the repo and renamed the `manifest.json` file)...
1) Generate a zip of the files in this repo
    - select all the files inside this repo and compress into a zip file
      - it must be the files themselves, not the containing directory
2) Disable `xpinstall.signatures.required`
    - WARNING: this is a security risk if you're not careful about the plugins you install
    - Open `about:config` and set this to `false`
3) Open up "Manage Extensions" in your browser
    - Firefox: `about:addons`
4) Click "Install Add-on From File..."
    - Click the cog icon, top right, and click "Install Add-on From File..."
5) Find and select the zip file you generated, and accept the various security warnings
6) Click on the plugin, open the "Permissions" tab, and toggle "Access your data for all websites"

Now the plugin is installed permanently, but changes to the source won't be reflected without going through the above steps again.

# What Have We Got Here

- `manifest.json`
  - Manage the extension
- `icons/lock.png`
  - Sample icon for the plugin
- `scripts/hello_world.js`
  - The content script throwing that "hello world" alert
- `scripts/_utils.js`
  - Some helper functions you might want to use in your scripts. This file is matched to `<all_urls>` so it's available for all content scripts.
- `menu/popup.html`
  - The plugin popup HTML (it's Javascript file is sibling)
  - The content of the feature list is dynamically populated from the content scripts, if you use the helper function `installEnablableFeatureWithCondition`

# Next Steps

There are many good tutorials online. Here's one from Chrome: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world. And one from Mozilla: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension.

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




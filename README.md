# Wandel Website

This is the complete static website for **Wandel**. It includes the official landing page, handbook, expandable wiki, world overview, updates, roadmap, team credits, legal notice and privacy policy.

## Publish with GitHub Pages

1. Create or open the GitHub repository for the website.
2. Extract this ZIP file.
3. Upload **the contents of this folder** so that `index.html` is located directly in the repository root.
4. Open **Settings → Pages** in GitHub.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select the `main` branch and `/(root)`, then save.

The website will normally be available at:

```text
https://YOUR-GITHUB-NAME.github.io/YOUR-REPOSITORY-NAME/
```

## Official external links

The Roblox game, Roblox group and Discord invite are already configured in:

```text
assets/js/site-config.js
```

Current link fields:

```js
robloxGameUrl: "...",
robloxGroupUrl: "...",
discordUrl: "...",
```

## Legal information

The Legal Notice and Privacy Policy have been filled with the supplied operator information and adapted to the current static GitHub Pages setup. They should be reviewed again whenever hosting, analytics, cookies, forms, embedded media, monetisation or the operator details change. Website templates cannot guarantee individual legal compliance.

## Add a new wiki article

1. Copy an existing file from the `wiki/` folder, for example `lantern.html`.
2. Change the title, description and content.
3. Add the article to `wiki.html`.
4. Add an entry to `assets/js/search-index.js` so the article appears in search results.

## Important files

- `index.html` – Home page
- `wiki.html` – Wiki hub
- `handbook.html` – Handbook
- `world.html` – World overview
- `updates.html` – News and development updates
- `roadmap.html` – Development roadmap
- `team.html` – Team and credits
- `legal-notice.html` – Legal notice
- `privacy-policy.html` – Privacy policy
- `impressum.html` – Compatibility copy of the English legal notice
- `datenschutz.html` – Compatibility copy of the English privacy policy
- `assets/css/styles.css` – Complete design and responsive layout
- `assets/js/main.js` – Navigation, external links, search, animations and interactions
- `assets/js/search-index.js` – Search entries
- `assets/js/site-config.js` – External links and operator configuration


## English cache-fix build

This package uses versioned English asset files (`main-en-v3.js`, `styles-en-v3.css`,
`search-index-en-v3.js`, and `site-config-en-v3.js`). This prevents browsers and
GitHub Pages from continuing to display an older cached German navigation or footer.

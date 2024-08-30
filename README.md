# ors-viewer

-   Reader for the Oregon Revised Statutes site.

# Installation

#### Step 1 (Git)

```
git clone https://github.com/ocdladefense/ors-viewer.git
```

#### `OPTIONAL` Step 2 (Git)

```
git pull
git checkout [BRANCH]
```

#### Step 3 (Git)

```
git submodule update --init --recursive
```

#### Step 4 (NPM)

```
npm update
npm run [BUILD]
```

**or**

```
npm update
npm run [WATCH]
```

#### `OPTIONAL` Step 5 (Visual Studio Code)

-   Install the Prettier plugin: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

#### `OPTIONAL` Step 6 (Visual Studio Code)

-   Install the ESLint plugin: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

# To-Do

#### Feature

-   Make ORS body headings use default hyperlink theme.

    -   **Possible solutions:** Update the ORS module to import and inject styles from the default hyperlink theme **or** or do the importing and injecting of the styles inside the function that's fetching the ORS body.

-   Implement prop structure to allow the stating of a grid size for dynamic grid size functionality (via the Chapter component). For instance to state which sidebars are used or if they are even being used, and depending on that, to pass the correct grid size to TailwindCSS.

-   Restructure the passing of props for the Chapter component to accept props from index.js to allow the passing of top-level variable. For instance for the specifying of which sidebars should be sticky.

-   Implement search functionality.

    -   **Possible solutions:** Use PHP REST API **or** Salesforce API.

-   Reimplement app switcher functionality.

    -   **Possible solutions:** Implement asynchronous functionality for the OCDLA View library.

#### Bug Report

-   Fix body anchors not working as expected due to asynchronous fetching.

    -   **Possible solutions:** create and execute a custom scroll-into-view feature based on the id given by the browser URL.

-   Fix sticky (or fixed) positioning for navbar / header to behave as expected with sidebar(s).

#### Misc

-   Make image imports use dynamic imports.

# Resources

-   https://codebeautify.org/json-fixer
-   https://codebeautify.org/remove-empty-lines

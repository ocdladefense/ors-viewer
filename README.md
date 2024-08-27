# ors-viewer

-   Reader for the Oregon Revised Statutes site.

# Installation

#### Step 1 (Git)

```
git clone https://github.com/ocdladefense/ors-viewer.git
```

#### Step 2 (Git) - Optional:

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
npm run [WATCH]
```

**or**

```
npm update
npm run [BUILD]
```

# To-Do

#### Feature

-   Make ORS body headings use default hyperlink theme.

    -   **Possible solutions:** Update the ORS module to import and inject styles from the default hyperlink theme **or** or do the importing and injecting of the styles inside the function that's fetching the ORS body.

#### Bug Report

-   Fix body anchors not working as expected due to asynchronous fetching.

    -   **Possible solutions:** create and execute a custom scroll-into-view feature based on the id given by the browser URL.

-   Re-implement functionality of highlighting active section links in the left sidebar.

    -   **Possible solutions:** Get a float / decimal value from the browser URL **OR** assign an id that has a string w/ integer value that matches the same format as the current browser URL format.

#### Misc

-   Implement search functionality.

    -   **Possible solutions:** Use PHP REST API **or** Salesforce API.

-   Re-implement app switcher functionality.

    -   **Possible solutions:** Implement asynchronous functionality for the OCDLA View library.

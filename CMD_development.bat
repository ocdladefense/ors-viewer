@ECHO OFF

ECHO ----------------
ECHO 1 - [ development - npm run watch-development-books-online ]
ECHO 2 - [ development - npm run watch-development-ors-viewer ]
ECHO 3 - [ development - npm run watch-production-books-online ]
ECHO 4 - [ development - npm run watch-production-ors-viewer ]
ECHO 5 - [ development - npm run lint ]
ECHO 6 - [ development - npm run lint-fix ]
ECHO 7 - [ development - npm run jsdoc-build ]
ECHO 8 - [ development - depcheck ]
ECHO 9 - [ development - check and install NPM updates ]
ECHO 10 - [ development - npm run git-reset ]
ECHO 11 - [ development - npm run git-force ]
ECHO ----------------

SET /P input="ENTER: "

IF %input% == 1 (
    CALL npm run watch-development-books-online
)

IF %input% == 2 (
    CALL npm run watch-development-ors-viewer
)

IF %input% == 3 (
    CALL npm run watch-production-books-online
)

IF %input% == 4 (
    CALL npm run watch-production-ors-viewer
)

IF %input% == 5 (
    CALL npm run lint
)

IF %input% == 6 (
    CALL npm run lint-fix
)

IF %input% == 7 (
    CALL npm run jsdoc-build
)

IF %input% == 8 (
    CALL depcheck
)

IF %input% == 9 (
    CALL ncu -u -t patch
    CALL npm install
)

IF %input% == 10 (
    CALL npm run git-reset
)

IF %input% == 11 (
    CALL npm run git-force
)

ECHO ----------------

ECHO FINISHED

PAUSE

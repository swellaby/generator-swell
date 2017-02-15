module.exports = {
    env: {
        browser: false,
        commonjs: true,
        node: true,
        mocha: true,
        "shared-node-browser": false,
        es6: true,
        worker: false,
        amd: false,
        jasmine: true,
        jest: false,
        phantomjs: true,
        protractor: true,
        qunit: true,
        jquery: false,
        prototypejs: false,
        shelljs: true,
        meteor: false,
        mongo: true,
        applescript: false,
        nashorn: false,
        serviceworker: false,
        atomtest: false,
        embertest: false,
        webextensions: false,
        greasemonkey: false
    },
    extends: 'eslint:recommended',
    rules: {
        indent: [
            'error',
            4,
            {
                "SwitchCase": 1
            }
        ],
        'linebreak-style': [
            'off'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        "no-console": [
            'off'
        ],
        "max-statements": [
            'error',
            {
                'max': 10
            },
            {
                'ignoreTopLevelFunctions': false
            }
        ],
        "require-yield": [
            'off'
        ],
        strict: [
            'error',
            'global'
        ]
        
    },
    // Custom Globals
    globals: {

    }    
};
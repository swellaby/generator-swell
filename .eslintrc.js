'use strict';

module.exports = {
    extends: "@swellaby/eslint-config/lib/bundles/ts-node",
    overrides: [
        {
            files: [ 'generators/app/*.js', 'generators/*.js' ],
            rules: {
                quotes: [ 'off' ]
            }
        }
    ]
};
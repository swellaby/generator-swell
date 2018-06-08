'use strict';

import semver = require('semver');
const packageJson = require('../package.json');

/**
 * Feature Flag indicating whether the 2.x version is enabled.
 * @returns {boolean}
 */
export const is2xFlagEnabled = () => {
    const version = packageJson.version;
    return semver.gte(version, '2.x.x');
};

/**
 * Feature Flag indicating whether the Angular project type is enabled.
 * @returns {boolean}
 */
export const isAngularProjectTypeEnabled = () => {
    const angularEnabled = false;
    return is2xFlagEnabled() && angularEnabled;
};

/**
 * Feature Flag indicating whether the CLI project type is enabled.
 * @returns {boolean}
 */
export const isCliProjectTypeEnabled = () => {
    return true;
};

/**
 * Feature Flag indicating whether the gulp inclusion is optional in scaffolded projects.
 * @returns {boolean}
 */
export const isOptionalGulpEnabled = () => {
    const gulpOptional = false;
    return is2xFlagEnabled() && gulpOptional;
};
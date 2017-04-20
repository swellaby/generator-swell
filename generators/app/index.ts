'use strict';

import yeoman = require('yeoman-generator');
import SwellabyGenerator = require('./swellaby-generator');

/**
 * Main entry point of the application.
 */
class Generator extends yeoman {
    public execute() {
        const swellabyGenerator = new SwellabyGenerator(this);
        return swellabyGenerator.createProject();
    }
}

export = Generator;
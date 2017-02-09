'use strict';

// This is a temporary fix due to the way the TypeScript compiler currently functions
// it converts single quotes to double quotes on import/require statements.
/* tslint:disable:no-single-line-block-comment JSHint and ESLint need single line block comments */
/* jshint quotmark:false */
/* eslint-disable quotes */
import builder = require('botbuilder');
import DialogBase = require('./dialog-base');
import config = require('../config');
/* eslint-enable quotes */
/* jshint quotmark:true */
/* tslint:enable:no-single-line-block-comment */

/**
 * Sample class for illustration purposes
 */
class Sample extends DialogBase {

    /**
     * Sets the dialogs
     */
    public setDialog() {
        this.dialog = [
            (session, args, next) => {
                session.userData.food = builder.EntityRecognizer.findEntity(args.entities, 'food');
                if (!session.userData.food) {
                    builder.Prompts.text(session, config.dialogs.speech.sample.askFood);
                } else {
                    session.userData.food = session.userData.food.entity;
                    next();
                }
            },
            (session, results) => {
                if (results.response) {
                    session.userData.food = results.response;
                }
                session.endDialog(config.dialogs.speech.sample.respondFood, session.userData.food);
            }
        ];
    }
}

export = Sample;

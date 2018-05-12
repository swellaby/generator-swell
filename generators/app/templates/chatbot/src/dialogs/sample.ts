'use strict';

import builder = require('botbuilder');
import DialogBase = require('./dialog-base');
import config = require('../config');

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

'use strict';

// This is a temporary fix due to the way the TypeScript compiler currently functions
// it converts single quotes to double quotes on import/require statements.
/* tslint:disable:no-single-line-block-comment JSHint and ESLint need single line block comments */
/* jshint quotmark:false */
/* eslint-disable quotes */
import builder = require('botbuilder');
/* eslint-enable quotes */
/* jshint quotmark:true */
/* tslint:enable:no-single-line-block-comment */

/**
 * Base class for Dialog Helper
 */
abstract class DialogHelperBase {
    /**
     * The dialog to register, read about dialogs here: https://docs.botframework.com/en-us/node/builder/chat/dialogs
     * @type {(builder.IDialogWaterfallStep[] | builder.IDialogWaterfallStep)}
     * @memberOf DialogHelperBase
     */
    public dialog: builder.IDialogWaterfallStep[] | builder.IDialogWaterfallStep;

    /**
     * Creates an instance of DialogHelperBase.
     * @memberOf DialogHelperBase
     */
    constructor() {
        this.setDialog();
    }

    /**
     * Binds the dialog to the passed bot on the passed path
     * @param {builder.UniversalBot} bot
     * @param {string} path
     * @memberOf DialogHelperBase
     */
    public register(bot: builder.UniversalBot, path: string) {
        console.log('Binding dialog to %s', path);
        bot.dialog(path, this.dialog);
    }

    /**
     * This method should be implimented to set the dialog property
     * @abstract
     * @memberOf DialogHelperBase
     */
    public abstract setDialog();
}

export = DialogHelperBase;

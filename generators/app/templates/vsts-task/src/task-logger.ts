'use strict';

/**
 * Trivial wrapper around console functionality so that we can
 * unit test the contents and order the task displays text.
 * @param {string} message - The message to log.
 */
export const log = (message: string) => {
    console.log(message);
};
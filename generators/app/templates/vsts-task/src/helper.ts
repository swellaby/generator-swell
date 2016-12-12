'use strict';

import Q = require('q');

/**
 * Example of a Helper class.
 * 
 * @class Helper
 */
class Helper {
    /**
     * Derives the sum of the two input numbers.
     * 
     * @param {number} a - The first input.
     * @param {number} b - The second input.
     * @returns {Q.Promise<number>}
     * 
     * @memberOf Helper
     */
    public add(a: number, b: number): Q.Promise<number> {
        const deferred: Q.Deferred<number> = Q.defer<number>();

        if (isNaN(a) || isNaN(b)) {
            return Q.reject<number>(new Error('Invalid inputs.'));
            //deferred.reject(new Error());
        } else {
            var sum = a + b;
            return Q.resolve<number>(sum);
            //deferred.resolve(sum);
        }

        //return deferred.promise;
    }
}

export = Helper;
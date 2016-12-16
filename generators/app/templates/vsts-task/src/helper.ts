'use strict';

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
     * @returns {Promise<number>}
     * 
     * @memberOf Helper
     */
    public add(a: number, b: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            if (isNaN(a) || isNaN(b)) {
                reject('Invalid inputs.');
            } else {
                resolve(a + b);
            }
        });
    }
}

export = Helper;
'use strict';

// This is a temporary fix due to the way the TypeScript compiler currently functions
// it converts single quotes to double quotes on import/require statements.
/* tslint:disable:no-single-line-block-comment ESLint needs single line block comments */
/* eslint-disable quotes */
import request = require('request');
/* eslint-enable quotes */
/* tslint:enable:no-single-line-block-comment */

/**
 * Example of a Helper class.
 *
 * @class Helper
 */
class Helper {
    /**
     * Derives the sum of the two input numbers.
     *
     * @description - Note that this is a bad example of using promises.
     *
     * @param {number} a - The first input.
     * @param {number} b - The second input.
     *
     * @returns {Promise<number>}
     */
    public add(a: number, b: number): Promise<number> {
        // Stupid example to show ES6 promise
        return new Promise<number>((resolve, reject) => {
            if (isNaN(a) || isNaN(b)) {
                reject(new Error('Invalid params.'));
            }
            resolve(a + b);
        });
    }

    /**
     * Retrieves the number of Team Projects in the specified Team Project Collection.
     *
     * @description This illustrates how you can make API calls to the VSTS instance.
     * An overview of the VSTS API can be found at: https://www.visualstudio.com/en-us/docs/integrate/api/overview
     * This specific API can be found at: https://www.visualstudio.com/en-us/docs/integrate/api/tfs/projects
     *
     * @param {string} teamProjectCollectionUri - The URI of the Team Project Collection.
     * @param {string} accessToken - The bearer token which can be used to access the Team Project Collection.
     *
     * @returns {Promise<number>}
     */
    public getNumTeamProjects(teamProjectCollectionUri: string, accessToken: string): Promise<number> {
       return new Promise<number>((resolve, reject) => {
            if (!teamProjectCollectionUri || !accessToken) {
                reject(new Error('Invalid params.'));
            }

            request.get(teamProjectCollectionUri, { 'auth': { 'bearer': accessToken}},
                /* tslint:disable:no-any Need to disable this due to the callback params defined by the module */
                (err: any, response: any, data: string) => {
                /* tslint:enable:no-any */
                    if (!err && (response.statusCode === 200)) {
                        try {
                            resolve(+JSON.parse(data).count);
                        } catch (err) {
                            reject(new Error('Error parsing API response'));
                        }
                    } else {
                        reject(new Error('Error calling API'));
                    }
                }
            );
        });
    }
}

export = Helper;
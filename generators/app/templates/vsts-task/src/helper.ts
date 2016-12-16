'use strict';

import request = require('request');

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
     * More details on the API can be found at: https://www.visualstudio.com/en-us/docs/integrate/api/overview
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
                (err: any, response: any, data: string) => {
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
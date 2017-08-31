'use strict';

import request = require('request');

/**
 * Example of a Helper class.
 *
 * @class Helper
 */
class Helper {
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
            const options = { 'auth': { 'bearer': accessToken } };
            // tslint:disable-next-line:no-any Need to disable this due to the callback params defined by the module
            request.get(teamProjectCollectionUri + '/_apis/projects', options, (err: any, response: any, data: string) => {
                if (!err && (response.statusCode === 200)) {
                    try {
                        resolve(+JSON.parse(data).count);
                    } catch (err) {
                        reject(new Error('Error parsing API response'));
                    }
                } else {
                    reject(new Error('Error calling API'));
                }
            });
        });
    }
}

export = Helper;
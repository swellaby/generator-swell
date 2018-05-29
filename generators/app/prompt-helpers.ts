'use strict';
/* tslint:disable:no-string-literal */
import ProjectTypes = require('./project-types');

/**
 * Helper used for conditional prompts based on the type of
 * project selected by the user.
 *
 * @param response
 * @param projectType
 * @private
 *
 * @returns {boolean}
 */
const isProjectType = (response, projectType) => {
    if (!response) {
        return false;
    }

    return response['type'] === projectType;
};

/**
 * Helper used for conditional prompts when the user selects a Boilerplate Project.
 * @param response
 * @returns {boolean}
 */
export const isBoilerplateOnlyProject = (response) => {
    return isProjectType(response, ProjectTypes[ProjectTypes.boilerplate]);
};

/**
 * Helper used for conditional prompts when the user selects a Chatbot Project.
 * @param response
 * @returns {boolean}
 */
export const isChatbotProject = (response) => {
    return isProjectType(response, ProjectTypes[ProjectTypes.chatbot]);
};

/**
 * Helper used for conditional prompts when the user selects a CLI Project.
 * @param response
 * @returns {boolean}
 */
export const isCLIProject = (response) => {
    return isProjectType(response, ProjectTypes[ProjectTypes.cli]);
};

/**
 * Helper used for conditional prompts when the user selects an Express API Project.
 * @param response
 * @returns {boolean}
 */
export const isExpressApiProject = (response) => {
    return isProjectType(response, ProjectTypes[ProjectTypes.expressApi]);
};

/**
 * Helper used for conditional prompts when the user selects a VSTS Task Project.
 * @param response
 * @returns {boolean}
 */
export const isVSTSTaskProject = (response) => {
    return isProjectType(response, ProjectTypes[ProjectTypes.vstsTask]);
};

/**
 * Helper used to get the value of for the docker user, defaulting to
 * the value the user specified for the author prompt.
 * @param response
 */
export const getDockerUserValue = (response) => {
    const dockerUser = 'myDockerHubId';
    if (!response) {
        return dockerUser;
    }

    return response['author'] || dockerUser;
};

/**
 * Helper function used to help determine when to prompt for VSTS task names.
 *
 * @param {Object} response - The config object with the user responses.
 * @param {number} numTasks - The number of tasks to check against.
 *
 * @returns {boolean}
 */
export const isRequestedVstsTaskCountGreaterThan = (response, numTasks: number) => {
    const isVstsTaskProjectType = isVSTSTaskProject(response);
    return isVstsTaskProjectType && (+response.vstsTaskCount > numTasks);
};

/**
 * Helper function used to determine if the user has requested more than one VSTS task.
 * @param {Object} response - The config object with the user responses.
 *
 * @returns {boolean}
 */
export const isRequestedVstsTaskCountGreaterThanOne = (response) => {
    return isRequestedVstsTaskCountGreaterThan(response, 1);
};

/**
 * Helper function used to determine if the user has requested more than two VSTS tasks.
 * @param {Object} response - The config object with the user responses.
 *
 * @returns {boolean}
 */
export const isRequestedVstsTaskCountGreaterThanTwo = (response) => {
    return isRequestedVstsTaskCountGreaterThan(response, 2);
};

/**
 * Helper function used to determine if the user has requested more than three VSTS tasks.
 * @param {Object} response - The config object with the user responses.
 *
 * @returns {boolean}
 */
export const isRequestedVstsTaskCountGreaterThanThree = (response) => {
    return isRequestedVstsTaskCountGreaterThan(response, 3);
};

/**
 * Helper function used to determine if the user has requested more than four VSTS tasks.
 * @param {Object} response - The config object with the user responses.
 *
 * @returns {boolean}
 */
export const isRequestedVstsTaskCountGreaterThanFour = (response) => {
    return isRequestedVstsTaskCountGreaterThan(response, 4);
};
'use strict';

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
}

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
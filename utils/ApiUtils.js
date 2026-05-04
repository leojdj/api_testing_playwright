
/**
 * Comments: Class with generic API Utils using JS.
 * Author: Leonardo Antezana
 * Created: 04/28/2026
 */

import Ajv from 'ajv'; // if missing: npm install ajv -D

import { log } from '../utils/LogUtils';

class ApiUtils {
    /**
     * VERIFY: Generic JSON schema validator.
     * @param {object} expectedSchema - JSON to validate. If it has one or less properties, assume error.
     * @return {boolean} The result of the check.
     */
    isValidSchema(expectedSchema, jsonToValidate) {
        if (Object.keys(jsonToValidate).length <= 1) {
            const jsonString = JSON.stringify(jsonToValidate);
            log.warn(`JSON Schema: An Invalid/Error object was received. ${jsonString}`);
            return false;
        }

        let ajv = new Ajv({ logger: console, allErrors: true });
        const schemaIsValid = ajv.validate(expectedSchema, jsonToValidate);

        if (ajv.errors) {
            log.err(`JSON Schema: ${JSON.stringify(ajv.errors)}`);
        }

        return schemaIsValid;
    }
}

// Export an instance of the class.
export let apiUtils = new ApiUtils();

/** LOG
 * 04282026 Created.
 */
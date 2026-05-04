
/**
 * Comments: Class holding the "Service Object" logic and data persistence for the SWAPI demo test files.
 *      In this particular demo, all endpoint calls could be reduced to a single method (see swapiGet). We lose some code clarity in the tests.
 * Author: Leonardo Antezana
 * Created: 04/28/2026
 */

import { request } from '@playwright/test';
import { apiUtils } from '../utils/ApiUtils';
import { log } from '../utils/LogUtils';

const peopleSchema = require('./people.schema.json');
const filmsSchema = require('./films.schema.json');
const vehiclesSchema = require('./vehicles.schema.json');
const starshipsSchema = require('./starships.schema.json');
const planetsSchema = require('./planets.schema.json');

class SwapiService {
    context = null;
    active_api = '';
    response;
    hypermedia;

    get response() {
        return this.response;
    }

    get hypermedia() {
        return this.hypermedia;
    }

    /*
        This method is a workaround that ensures the 'newContext' is created once per Playwright worker, or when the object is reset.
        Reduces boiler code in the test file, if nothing else.
        For considerations with auth/cookies this might be more complex, in which case it could come from an inherited class, if necessary.
    */
    async singleton() {
        if ( !this.context) {
            this.context = await request.newContext();
            log.info(`Created Context...`);
        }
    }

    // api/people/{id}
    async people(id) {
        await this.singleton();

        this.active_api = 'people';

        const endpoint = await this.context.get(`people/${id}`);
        this.response = await endpoint.json();
    }

    // api/films/{id}
    async films(id) {
        await this.singleton();

        this.active_api = 'films';

        const endpoint = await this.context.get(`films/${id}`);
        this.response = await endpoint.json();
    }

    // api/vehicles/{id}
    async vehicles(id) {
        await this.singleton();

        this.active_api = 'vehicles';

        const endpoint = await this.context.get(`vehicles/${id}`);
        this.response = await endpoint.json();
    }

    // api/starships/{id}
    async starships(id) {
        await this.singleton();

        this.active_api = 'starships';

        const endpoint = await this.context.get(`starships/${id}`);
        this.response = await endpoint.json();
    }

    // Generic version of the above methods, works for this particular demo/case. Needs knowledge on the naming convention of the URLs.
    // api/{any}/{id}
    async swapiGet(url, id) {
        await this.singleton();

        this.active_api = url;

        const endpoint = await this.context.get(`${url}/${id}`);
        this.response = await endpoint.json();
    }

    // schema test
    isValidSchema() {
        switch (this.active_api) {
            case 'people': return apiUtils.isValidSchema(peopleSchema, this.response);
            case 'films': return apiUtils.isValidSchema(filmsSchema, this.response);
            case 'vehicles': return apiUtils.isValidSchema(vehiclesSchema, this.response);
            case 'starships': return apiUtils.isValidSchema(starshipsSchema, this.response);
            case 'planets': return apiUtils.isValidSchema(planetsSchema, this.response);
        }
    }

    // INTERNAL: random number between 0 and max, excluding max.
    randomNumber(max) {
        return Math.floor(Math.random() * max);
    }

    extractId(hypermedia) {
        return hypermedia.substring(hypermedia.search(/\d/), hypermedia.length);
    }

    // fetch a random element from a hypermedia list
    fetchRandomId(list) {
        if ((list == undefined) || (list.length == 0)) {
            log.warn('Hypermedia array is empty.');
            return '';
        }

        let i = this.randomNumber(list.length);

        this.hypermedia = list[i]
        return this.extractId(this.hypermedia);
    }
}

// Export an instance of the class as it is very unlikely that more than one will be needed.
export let swapiService = new SwapiService();

/** LOG
 * 04302026 Added the swapiGet method (generic of all the others). Added JSON schema and updated the isValidSchema method.
 * 04302026 Added the starships method. Added the JSON schema and updated the isValidSchema method.
 * 04292026 Added support code for the 'test sequence' sample file.
 * 04292026 Added films and vehicles methods, updated Schema check to include them. Created the JSON schemas.
 * 04282026 Created the class and the method for the people endpoint.
 */
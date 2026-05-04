
/**
 * Comments: API "test pattern" where each test calls various endpoints to complete a task. There is a dependency among the endpoints that form a sequence.
 *      Endpoints are not necessarily related, but they can be combined for the task. Tests themselves could form a sequence. Asserts verify the status of the end-task.
 * Author: Leonardo Antezana
 * Created: 04/30/2026
 */

import { test, expect } from '@playwright/test';
import { swapiService } from '../services/SwapiService';

import { log } from '../utils/LogUtils';

test.describe('API Sequence', () => {

    test('People Is Found In the List', async ({ request }) => {
        // Request: Get the list of people
        await swapiService.people('');
        let people_list = swapiService.response;
        log.obj(people_list);

        // Request: Get the people of interest
        await swapiService.people(1);
        log.obj(swapiService.response);
        
        // Asserts - Simpler to transform the reponse item into an array, to compare array to array.
        expect(people_list).toEqual(expect.arrayContaining( [swapiService.response] ));
    });

    test('Starship Is Found In the List', async ({ request }) => {
        // Randomize the starship of interest
        let id = swapiService.fetchRandomId(swapiService.response.starships);

        // Request: Get the list of starships
        await swapiService.starships('');
        let starships_list = swapiService.response;
        log.obj(starships_list);

        // Request: Get the starship of interest
        await swapiService.starships(id);
        log.obj(swapiService.response);

        // Asserts
        expect(starships_list).toEqual(expect.arrayContaining( [swapiService.response] ));
        expect(swapiService.isValidSchema()).toBeTruthy();
    });

});

/** LOG
 * 04302026 Created the file as a (very basic and simple) sample of a sequence of combinable API calls in a test.
 */
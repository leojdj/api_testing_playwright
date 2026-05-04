
/**
 * Comments: API "test pattern" where there is a dependency among the tests, they form a sequence (can be of related tasks).
 *      Tests are related, the asserts can verify (some) business logic, not just the plain response (in this sample this fact is not so noticeable).
 * Author: Leonardo Antezana
 * Created: 04/29/2026
 */

import { test, expect } from '@playwright/test';
import { swapiService } from '../services/SwapiService';

import { log } from '../utils/LogUtils';

test.describe('Test Sequence', () => {

    test('Get People', async ({ request }) => {
        await swapiService.people(1);
        log.obj(swapiService.response);

        // Asserts
        expect(swapiService.isValidSchema()).toBeTruthy();
    });

    // The response is holding the 'people' data.
    test('Fetch a Film', async ({ request }) => {
        let id = swapiService.fetchRandomId(swapiService.response.films);

        await swapiService.films(id);
        log.obj(swapiService.response);

        // Asserts
        expect(swapiService.response.url).toBe(swapiService.hypermedia);
    });

    // The response is holding the 'films' data.
    test('Fetch a Vehicle', async ({ request }) => {
        let id = swapiService.fetchRandomId(swapiService.response.vehicles);

        await swapiService.vehicles(id);
        log.obj(swapiService.response);

        // Asserts
        expect(swapiService.response.url).toBe(swapiService.hypermedia);
    });

});

/** LOG
 * 04292026 Created the file as a (very basic and simple) sample of a sequence of related tests.
 */
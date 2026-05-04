
/**
 * Comments: API "test pattern" where each endpoint is tested on its own.
 *      No relation between tests, asserts on each test verify the response.
 * Author: Leonardo Antezana
 * Created: 04/28/2026
 */

import { test, expect } from '@playwright/test';
import { swapiService } from '../services/SwapiService';

import { log } from '../utils/LogUtils';

test('Get People', async ({ request }) => {
    await swapiService.people(1);
    log.obj(swapiService.response);

    // Asserts
    expect(swapiService.isValidSchema()).toBeTruthy();
});

test('Get Film', async ({ request }) => {
    await swapiService.films(1);
    log.obj(swapiService.response);

    // Asserts
    expect(swapiService.isValidSchema()).toBeTruthy();
});

test('Get Vehicle', async ({ request }) => {
    await swapiService.vehicles(14);
    log.obj(swapiService.response);

    // Asserts
    expect(swapiService.isValidSchema()).toBeTruthy();
});

test('Get Planet', async ({ request }) => {
    await swapiService.swapiGet('planets', 1);
    log.obj(swapiService.response);

    // Asserts
    expect(swapiService.isValidSchema()).toBeTruthy();
});

/** LOG
 * 04302026 Added "Get Planet" test using the generic method swapiGet, as a sample.
 * 04292026 Added films and vehicles tests.
 * 04282026 Created the file to research patterns for API Testing using Playwright. With JS to avoid annoyances with data types.
 */
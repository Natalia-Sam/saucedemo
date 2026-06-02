import { test, expect } from '@playwright/test';
import AirportApiService from '../api/airportgap.api';
import { users } from './data/users';

test.describe('Airport Authentication API Suite', () => {
    let apiService: AirportApiService;
    test.beforeEach(async ({ request }) => {
        await test.step('Create instance airport', async () => {
            apiService = new AirportApiService(request);
        });
    });

    test('verify authentication with valid credentials', async () => {
        let authToken: string;
        await test.step('Authenticate with valid credentials', async () => {
            const response = await apiService.getAirportGapToken(users.validUser);
            expect(response.status()).toBe(200);
            authToken = (await response.json()).token;
        });

        await test.step('Verify the authentication token', async () => {
            expect(authToken).toBeTruthy();
            expect(typeof authToken).toBe('string');
            expect(authToken.length).toBeGreaterThan(0);
        });
    });

    test('verify authentication with invalid password', async () => {
        await test.step('Authenticate with invalid password', async () => {
            const response = await apiService.getAirportGapToken(users.userWithInvalidPassword);
            expect(response.status()).toBe(401);
        });
    });
});

// npx playwright test airport-authentication
// npx playwright test tests/airport-authentication.spec.ts --ui

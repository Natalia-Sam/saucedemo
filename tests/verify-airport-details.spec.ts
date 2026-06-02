import { test, expect } from '@playwright/test';
import AirportApiService from '../api/airportgap.api';
import Airport from '../api/interfaces/airport';
import ApiError from '../api/interfaces/api-error';

test.describe('Airport Details API Suite', () => {
    let apiService: AirportApiService;
    test.beforeEach(async ({ request }) => {
        await test.step('Create instance airport', async () => {
            apiService = new AirportApiService(request);
        });
    });

    test('verify airport details', async () => {
        let airportDetails!: Airport;
        await test.step('Get airport details', async () => {
            const response = await apiService.getSpecificAirportId('JFK');
            expect(response.status()).toBe(200);
            airportDetails = (await response.json()).data;
            // console.log(`airport data is: `, airportDetails);
            // console.log(`airport data is: ${JSON.stringify(airportDetails, null, 2)}`);
        });

        await test.step('Verify the response data', async () => {
            expect(airportDetails).toBeTruthy();
            expect(airportDetails.id).toBe('JFK');
            expect(airportDetails.attributes.name).toBe('John F Kennedy International Airport');
            expect(airportDetails.attributes.city).toBe('New York');
            expect(airportDetails.attributes.country).toBe('United States');
            expect(airportDetails.attributes.iata).toBe('JFK');
        });
    });

    test('Get airport details for invalid code', async () => {
        let errorDetails!: ApiError[];
        await test.step('Get airport details', async () => {
            const response = await apiService.getSpecificAirportId('QQQ');
            expect(response.status()).toBe(404);
            errorDetails = (await response.json()).errors;
        });

        await test.step('Verify error message', async () => {
            expect(errorDetails[0].detail).toBe('The page you requested could not be found');
        });
    });
});

// npx playwright test verify-airport-details
// npx playwright test tests/verify-airport-details.spec.ts --ui

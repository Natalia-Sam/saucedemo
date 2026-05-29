import { test, expect } from '@playwright/test';
import AirportApiService from '../api/airportgap.api';
import Airport from '../api/interfaces/airport';
import AirportsDistance from '../api/interfaces/airports-distance';

// -------- Refactored version -------------------------

// test("verify airport", async ({ request }) => {
//   const response = await request.get("https://airportgap.com/api/airports");
//   const airports: Airport[] = (await response.json()).data;
//   console.log(airports[0].attributes.name);
//   expect(airports.length, {
//     message: "verify that response contains exactly 30 airports",
//   }).toBe(30);
// });

// -------- Refactored version with Suite -------------------------

test.describe('API Suite', () => {
    let apiService: AirportApiService;
    test.beforeEach(async ({ request }) => {
        await test.step('Create instance airport', async () => {
            apiService = new AirportApiService(request);
        });
    });

    test('verify airports list', async () => {
        let airports: Airport[];
        await test.step('Create airports array', async () => {
            const response = await apiService.getAirports();
            airports = (await response.json()).data;
            // console.log(`airport name is: ${airports[0].attributes.name}`);
            // console.log(`array length is: ${airports.length}`);
        });

        await test.step('verify that response contains exactly 30 airports', async () => {
            // expect(airports.length, {
            //   message: "verify that response contains exactly 30 airports",
            // }).toBe(30);

            expect(airports.length).toBe(30);
        });
    });

    test('verify distance between airports KIX and NRT', async () => {
        let airportsDistanceValue: number;
        await test.step('Get Airports Distance', async () => {
            const response = await apiService.getAirportsDistance({
                from: 'KIX',
                to: 'NRT',
            });
            const airportsDistance: AirportsDistance = (await response.json()).data;
            airportsDistanceValue = airportsDistance.attributes.kilometers;
            // console.log(`the distance between airports is ${airportsDistanceValue}`);
        });

        await test.step('verify that distance is greater than 400 kilometers', async () => {
            //   expect(airportsDistanceValue, {
            //   message: "verify that distance is greater than 400 kilometers",
            // }).toBeGreaterThan(400);

            expect(airportsDistanceValue).toBeGreaterThan(400);
        });
    });

    test('Verify Distance Is Returned in All Three Units', async () => {
        let kilometersValue: number;
        let milesValue: number;
        let nauticalMilesValue: number;
        await test.step('Get values of distances', async () => {
            const response = await apiService.getAirportsDistance({
                from: 'SYD',
                to: 'LAX',
            });
            expect(response.status()).toBe(200);
            const airportsDistance: AirportsDistance = (await response.json()).data;
            kilometersValue = airportsDistance.attributes.kilometers;
            milesValue = airportsDistance.attributes.miles;
            nauticalMilesValue = airportsDistance.attributes.nautical_miles;
        });

        await test.step('verify that kilometers is greater than 12000', async () => {
            // expect(kilometersValue, {
            //     message: 'verify that kilometers is greater than 12000',
            // }).toBeGreaterThan(12000);

            expect(kilometersValue).toBeGreaterThan(12000);
        });

        await test.step('verify that miles is greater than 7000', async () => {
            // expect(milesValue, {
            //     message: 'verify that miles is greater than 7000',
            // }).toBeGreaterThan(7000);

            expect(milesValue).toBeGreaterThan(7000);
        });

        await test.step('verify that nautical_miles is greater than 6000', async () => {
            // expect(nauticalMilesValue, {
            //     message: 'verify that nautical_miles is greater than 6000',
            // }).toBeGreaterThan(6000);

            expect(nauticalMilesValue).toBeGreaterThan(6000);
        });
    });
});

// npx playwright test airportgap-apitest
// npx playwright test tests/airportgap-apitest.spec.ts --ui

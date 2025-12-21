import { test, expect } from "@playwright/test";
import AirportApiService from "../api/airportgap.api";
import Airport from "../api/interfaces/airport";
import AirportsDistance from "../api/interfaces/airports-distance";

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

test.describe("API Suite", () => {
  let apiService: AirportApiService;
  test.beforeEach(async ({ request }) => {
    apiService = new AirportApiService(request);
  });

  test("verify airports list", async () => {
    const response = await apiService.getAirports();
    const airports: Airport[] = (await response.json()).data;
    console.log(`airport name is: ${airports[0].attributes.name}`);
    console.log(`array length is: ${airports.length}`);
    expect(airports.length, {
      message: "verify that response contains exactly 30 airports",
    }).toBe(30);
  });

  test("verify distance between airports", async () => {
    const response = await apiService.getAirportsDistance({
      from: "KIX",
      to: "NRT",
    });
    const airportsDistance: AirportsDistance = (await response.json()).data;
    const airportsDistanceValue = airportsDistance.attributes.kilometers;
    console.log(`the distance between airports is ${airportsDistanceValue}`);
    expect(airportsDistanceValue, {
      message: "verify that distance is greater than 400 kilometers",
    }).toBeGreaterThan(400);
  });
});

// npx playwright test airportgap-apitest
// npx playwright test tests/airportgap-apitest.spec.ts --ui

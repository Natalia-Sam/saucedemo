import { test, expect } from "@playwright/test";
import { expect as playwrightExpect } from "@playwright/test";
import { getAirports, getAirportsDistance } from "../api/airportgap-draft.api";

// -------- Plain code -------------------------
// test("airports list", async ({ request }) => {
//   const airportsList = await request.get(
//     `https://airportgap.com/api/airports`,
//     {
//       headers: { "Content-Type": "application/json" },
//     },
//   );
//   const airportsListJson = await airportsList.json();
//   // console.log(airportsListJson);
//   expect(airportsListJson.data).toHaveLength(30);

//   const requiredAirports = [
//     "Akureyri Airport",
//     "St. Anthony Airport",
//     "CFB Bagotville",
//   ];

//   for (const airportName of requiredAirports) {
//     expect(airportsListJson.data).toContainEqual(
//       expect.objectContaining({
//         type: "airport",
//         attributes: expect.objectContaining({
//           name: airportName,
//         }),
//       }),
//     );
//   }
// });

// test("verify distance between airports", async ({ request }) => {
//   const airportsDistance = await request.post(
//     `https://airportgap.com/api/airports/distance`,
//     {
//       headers: { "Content-Type": "application/json" },
//       data: JSON.stringify({ from: "KIX", to: "NRT" }),
//     },
//   );
//   expect(airportsDistance.status()).toBe(200);

//   const airportsDistanceJson = await airportsDistance.json();
//   // console.log(airportsDistanceJson);
//   expect(airportsDistanceJson.data.attributes.kilometers).toBeGreaterThan(400);
// });

// -------- Not refactored version -------------------------

test("verify airports list", async ({ request }) => {
  const airportsList = await getAirports(request);
  const airportsListJson = await airportsList.json();
  expect(airportsListJson.data).toHaveLength(30);

  const requiredAirports = [
    "Akureyri Airport",
    "St. Anthony Airport",
    "CFB Bagotville",
  ];

  for (const airportName of requiredAirports) {
    expect(airportsListJson.data).toContainEqual(
      expect.objectContaining({
        type: "airport",
        attributes: expect.objectContaining({
          name: airportName,
        }),
      }),
    );
  }
});

test("verify distance between airports", async ({ request }) => {
  const airportsDistance = await getAirportsDistance(request, {
    from: "KIX",
    to: "NRT",
  });
  expect(airportsDistance.status()).toBe(200);
  const airportsDistanceJson = await airportsDistance.json();
  console.log(airportsDistanceJson);
  expect(airportsDistanceJson.data.attributes.kilometers).toBeGreaterThan(400);
});

// npx playwright test airportgap-draft-apitest

import { APIRequestContext, expect } from "@playwright/test";

export async function getAirports(apiClient: APIRequestContext) {
  const airportsList = await apiClient.get(
    `https://airportgap.com/api/airports`,
    {
      headers: { "Content-Type": "application/json" },
    },
  );

  return airportsList;
}

export async function getAirportsDistance(
  apiClient: APIRequestContext,
  requestObject: { from: string; to: string },
) {
  const airportsDistance = await apiClient.post(
    `https://airportgap.com/api/airports/distance`,
    {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(requestObject),
    },
  );

  return airportsDistance;
}

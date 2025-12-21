import { APIRequestContext, expect } from "@playwright/test";

export default class AirportApiService {
  private baseUrl: string = "https://airportgap.com/api";
  private request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getAirports() {
    const airportsList = await this.request.get(`${this.baseUrl}/airports`, {
      headers: { "Content-Type": "application/json" },
    });
    return airportsList;
  }

  async getAirportsDistance(requestObject: { from: string; to: string }) {
    const airportsDistance = await this.request.post(
      `${this.baseUrl}/airports/distance`,
      {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(requestObject),
      },
    );
    return airportsDistance;
  }
}

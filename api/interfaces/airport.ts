export default interface Airport {
  attributes: {
    name: string;
    city: string;
    country: string | undefined;
    iata: string;
    icao: string;
    latitude: string;
    longitude: string;
    altitude: number | null;
    timezone: string;
  };
}

export default interface Airport {
    id: string;
    type: string;
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

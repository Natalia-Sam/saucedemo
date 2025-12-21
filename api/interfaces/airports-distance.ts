export default interface AirportsDistance {
  attributes: {
    from_airport: object | any;
    to_airport: object | any;
    kilometers: number;
    miles: number;
    nautical_miles: number;
  };
}

// export default interface AirportsDistance {
//   data: {
//     id: string;
//     type: string;
//     attributes: {
//       from_airport: object | any;
//       to_airport: object | any;
//       kilometers: number;
//       miles: number;
//       nautical_miles: number;
//     };
//   };
// }

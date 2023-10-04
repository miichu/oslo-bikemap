export type BikeStationType = IStationInfo & Omit<IStationStatus, "station_id">;

export interface IStationInfo extends ICoordinates {
  station_id: string;
  name: string;
  address: string;
  capacity: number;
  is_virtual_station: boolean;
  rental_uris: {
    android: string;
    ios: string;
  };
  station_area: {
    type: string;
    coordinates: string[];
  };
}

export interface IStationStatus {
  station_id: string;
  is_installed: number;
  is_renting: number;
  num_bikes_available: number;
  num_docks_available: number;
  last_reported: number;
  is_returning: boolean;
}

export interface ICoordinates {
  lat: number;
  lon: number;
}

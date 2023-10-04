import {
  BikeStationType,
  IStationInfo,
  IStationStatus,
} from "../types/station";

const defaultStatus: IStationStatus = {
  station_id: "",
  is_installed: 0,
  is_renting: 0,
  num_bikes_available: 0,
  num_docks_available: 0,
  last_reported: 0,
  is_returning: false,
};

export const getBikeStations = (
  stations: IStationInfo[],
  stationStatuses: IStationStatus[]
): BikeStationType[] => {
  // Merge station info and status
  const mergedList: BikeStationType[] = stations.map((station) => {
    const status = stationStatuses.find(
      (status) => status.station_id === station.station_id
    );
    const stationStatus: IStationStatus = status ? status : defaultStatus;
    return {
      ...station,
      ...stationStatus,
    };
  });
  return mergedList;
};

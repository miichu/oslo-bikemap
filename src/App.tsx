import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { BodyLong, Heading, Loader } from "@navikt/ds-react";
import { ErrorBoundary } from "react-error-boundary";
import { fetchBikeStations } from "./queries/fetchBikeStations";
import { fetchBikeStationStatus } from "./queries/fetchBikeStationStatus";
import { IStationInfo, IStationStatus } from "./types/station";
import { useEffect, useMemo, useState } from "react";
import BikeMap from "./components/BikeMap";
import Fallback from "./components/Fallback";
import UserLocation from "./components/UserLocation";
import { getBikeStations } from "./util/getBikeStations";
import { useQueries } from "react-query";

function App() {
  const [stationsInformation, setStationsInformation] = useState<
    IStationInfo[]
  >([]);
  const [stationStatuses, setStationStatuses] = useState<IStationStatus[]>([]);

  const [dataStations, dataStationStatus] = useQueries([
    {
      queryKey: ["stations"],
      queryFn: fetchBikeStations,
      suspense: true,
    },
    {
      queryKey: ["statuses"],
      queryFn: fetchBikeStationStatus,
      suspense: true,
    },
  ]);

  const bikeStations = getBikeStations(stationsInformation, stationStatuses);

  const shouldRenderMap: boolean = useMemo(() => {
    if (
      bikeStations.length > 0 &&
      !dataStations.isLoading &&
      !dataStationStatus.isLoading
    ) {
      return true;
    } else {
      return false;
    }
  }, [bikeStations, dataStations, dataStationStatus]);

  useEffect(() => {
    dataStations.data && setStationsInformation(dataStations.data.stations);
    dataStationStatus.data &&
      setStationStatuses(dataStationStatus.data.stations);
  }, [dataStations, dataStationStatus]);

  if (dataStations.isError || dataStationStatus.isError) {
    return `There was an error! ${
      dataStations.error || dataStationStatus.error
    }`;
  }

  return (
    <ErrorBoundary fallback={<Fallback />}>
      <Heading size="large" level="1">
        Sykkelkart
      </Heading>
      <BodyLong size="large">
        Dette er en oversikt over Oslo bysykkel sine sykler, stasjoner og ledig
        kapasitet per sykkelstativ.
      </BodyLong>
      <UserLocation />
      {shouldRenderMap === true ? (
        <BikeMap bikeStations={bikeStations} />
      ) : (
        <Loader size="3xlarge" title="Laster inn..." />
      )}
    </ErrorBoundary>
  );
}

export default App;

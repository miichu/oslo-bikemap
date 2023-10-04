import axios from "axios";

export const fetchBikeStationStatus = async () => {
  try {
    const response = await axios.get(
      "/api/oslobysykkel.no/station_status.json",
      {
        headers: {
          "Client-Identifier": "myOrigo-bikemap",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(
      `An error occurred while trying to fetch station status! ${error}`
    );
  }
};

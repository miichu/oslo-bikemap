import { ICoordinates } from "../types/station";

export const getUserLocationFromBrowser = (): Promise<ICoordinates> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          resolve(location);
        },
        (error) => {
          console.log("Error getting the location 😿", error);
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported 🤷"));
    }
  });
};

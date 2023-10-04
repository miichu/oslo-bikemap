import React, { useContext, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { BikeStationType } from "../types/station";
import { UserLocationContext } from "../contexts/UserLocationContext";

// AccessToken from MapBox account
// TODO When using this in production, this should be moved to a .env file
const accessToken =
  "pk.eyJ1IjoibXl0aG5nIiwiYSI6ImNsbjczY2c1NjBybzAybW1uMnY0N2ltOHIifQ.CWq5q3XB9fxTNwJD_vu_Kw";

interface MapProps {
  bikeStations: BikeStationType[];
}

const Map: React.FC<MapProps> = ({ bikeStations }) => {
  const popupContentComponent = ({
    name,
    address,
    capacity,
    num_bikes_available,
    num_docks_available,
  }: BikeStationType) =>
    `
      <h2 class="popup-heading">${name} </h2>
      <em class="popup-address">${address}</em>
      <b>Ledige sykler</b> 🚲 ${num_bikes_available}
      <b>Ledig parkering</b> 🅿️ ${num_docks_available} av ${capacity} 
    `;

  mapboxgl.accessToken = accessToken;

  const { sharedLocation } = useContext(UserLocationContext);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    // initialize map only once
    if (map.current) return;

    if (mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: sharedLocation ? sharedLocation : [10.757933, 59.911491],
        zoom: sharedLocation ? 15 : 12.5,
      });

      bikeStations.forEach((station) => {
        new mapboxgl.Marker({ scale: 0.8 })
          .setLngLat([station.lon, station.lat])
          .setPopup(
            new mapboxgl.Popup().setHTML(popupContentComponent(station))
          )
          // @ts-ignore
          .addTo(map.current);
      });
    }
  }, [accessToken, bikeStations, sharedLocation]);

  // Fly to the sharedLocation on map, zoom in,
  // create a new marker for the location, and show pop up!
  useEffect(() => {
    if (map.current && sharedLocation !== undefined) {
      const marker = new mapboxgl.Marker({ scale: 0.8, color: "red" })
        .setLngLat([sharedLocation.lon, sharedLocation.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `
            <h2>Her er du! 📍✨</h2> 
            <p>Trykk på en av de blå markørene for å se mer informasjon om sykkelstativene </p>
            `
          )
        )
        .addTo(map.current);

      marker.togglePopup();

      map.current.flyTo({
        center: [sharedLocation.lon, sharedLocation.lat],
        zoom: 15,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
  }, [sharedLocation]);

  return (
    <div data-testid="bike-map" ref={mapContainer} className="map-container" />
  );
};

export default Map;

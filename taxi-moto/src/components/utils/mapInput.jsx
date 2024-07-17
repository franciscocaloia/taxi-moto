import React from "react";
import { Marker } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { Map } from "../map/map";
import { Icon } from "leaflet";
import markerIconRedPng from "../../assets/marker-icon-red.png";
import { MapInputEvent } from "./mapInputEvent";
export const MapInput = () => {
  const { auth: user, mapInput } = useSelector((state) => state);
  return (
    <>
      {user && (
        <Map bounds={[[-31.448934417916526, -60.930395576862736]]}>
            { mapInput?.mapCoords && <Marker
              draggable="false"
              position={mapInput.mapCoords}
              icon={
                new Icon({
                  iconUrl: markerIconRedPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            />}
          <MapInputEvent/>
        </Map>
      )}
    </>
  );
};

import React from "react";
import { Marker } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import Routing from "../../UI/routing";
import { useSelector } from "react-redux";
import { Map } from "../map/map";
import { Icon } from "leaflet";
import markerIconRedPng from "../../assets/marker-icon-red.png";
export const MapInputForm = () => {
  const { auth: user, mapInput } = useSelector((state) => state);

  return (
    <>
      {user && (
        <Map bounds={[user.location]}>
          {!mapInput.mapCoords && (
            <Marker
              draggable="false"
              position={user.location}
              icon={
                new Icon({
                  iconUrl: markerIconRedPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            />
          )}
          <Routing location={user.location} />
        </Map>
      )}
    </>
  );
};

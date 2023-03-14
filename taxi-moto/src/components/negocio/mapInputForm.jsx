import React from "react";
import { Marker } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import Routing from "../../UI/routing";
import { useSelector } from "react-redux";
import { Map } from "../map/map";
export const MapInputForm = () => {
  const user = useSelector((state) => state.auth);
  return (
    <>
      {user && (
        <Map bounds={[user.location]}>
          <Marker draggable="false" position={user.location} />
          <Routing location={user.location} />
        </Map>
      )}
    </>
  );
};

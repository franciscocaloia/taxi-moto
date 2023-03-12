import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import Routing from "../../UI/routing";
import { useSelector } from "react-redux";
export const MapInputForm = () => {
  const user = useSelector((state) => state.auth);
  return (
    <>
      {user && (
        <MapContainer
          className="h-full"
          center={user.location}
          zoom={14}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker draggable="false" position={user.location} />
          <Routing location={user.location} />
        </MapContainer>
      )}
    </>
  );
};

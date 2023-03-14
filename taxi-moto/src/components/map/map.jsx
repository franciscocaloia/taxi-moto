import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export const Map = ({ bounds, children }) => {
  return (
    <MapContainer
      className="h-full z-0 w-full"
      bounds={bounds}
      zoom={14}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

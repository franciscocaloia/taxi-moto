import React from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet-routing-machine";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import { useAuth } from "../../store/useAuth";
// import { DestinationMarker } from "../../UI/destinationMarker";
import Routing from "../../UI/routing";
export const NegocioInformacionPage = () => {
  const { user } = useAuth();
  return (
    <>
      {user && (
        <MapContainer
          className="h-full"
          center={user.location}
          zoom={18}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={user.location}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Routing location={user.location} />

          {/* <DestinationMarker location={user.location} /> */}
        </MapContainer>
      )}
    </>
  );
};

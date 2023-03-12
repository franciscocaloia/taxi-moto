import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

export const DestinationMarker = () => {
  const [destination, setDestination] = useState();
  const map = useMap();
  useMapEvents({
    click(event) {
      setDestination(event.latlng);
    },
  });
  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(location), destination],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, destination]);

  return destination && <Marker position={destination} />;
};

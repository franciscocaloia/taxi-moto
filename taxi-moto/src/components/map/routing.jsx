import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { useMap } from "react-leaflet";

export const Routing = ({ route }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(route.from), L.latLng(route.to)],
    }).addTo(map);
    map.zoomOut(1);
    routingControl.hide();
    return () => map.removeControl(routingControl);
  }, [map]);
  return null;
};

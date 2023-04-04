import { useEffect } from "react";
import L, { Icon } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { useMap } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconRedPng from "../../assets/marker-icon-red.png";
export const Routing = ({ route }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(route.from), L.latLng(route.to)],
      createMarker: function (i, wp, nWps) {
        if (i === 0) {
          // here change the starting and ending icons
          return L.marker(wp.latLng, {
            icon: new Icon({
              iconUrl: markerIconRedPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }), // here pass the custom marker icon instance
          });
        } else {
          // here change all the others
          return L.marker(wp.latLng, {
            icon: new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
          });
        }
      },
    }).addTo(map);
    map.zoomOut(1);
    routingControl.hide();
    return () => map.removeControl(routingControl);
  }, [map]);
  return null;
};

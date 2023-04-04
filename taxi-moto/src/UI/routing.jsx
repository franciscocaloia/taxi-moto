import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { useMap, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { mapInputActions } from "../store/mapInputSlice";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIconRedPng from "../assets/marker-icon-red.png";
export default function Routing() {
  const map = useMap();
  const dispatch = useDispatch();
  const location = useSelector((state) => state.auth.location);
  const mapCoords = useSelector((state) => state.mapInput.mapCoords);
  useMapEvents({
    click(event) {
      const coords = event.latlng;
      dispatch(mapInputActions.setMapCoords([coords.lat, coords.lng]));
    },
  });
  useEffect(() => {
    if (!map) return;
    if (!mapCoords) return;
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(location), L.latLng(mapCoords)],
      routeWhileDragging: false,
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
    routingControl.hide();
    routingControl.on("routesfound", (event) => {
      const { lat, lng } = event.routes[0].waypoints[1].latLng;
      const route = {
        from: location,
        to: [lat, lng],
        totalDistance: event.routes[0].summary.totalDistance,
      };
      map.fitBounds([location, [lat, lng]], { duration: 1 });
      dispatch(mapInputActions.setRoute(route));
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, location, mapCoords]);

  return null;
}

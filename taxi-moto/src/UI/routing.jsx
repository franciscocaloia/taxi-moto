import { useEffect, useState } from "react";
import L, { routing } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "leaflet-control-geocoder";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { useMap, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { mapInputActions } from "../store/mapInputSlice";

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

import React, { useEffect } from 'react'
import { mapInputActions } from '../../store/mapInputSlice';
import { useMapEvents } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

export const MapInputEvent = () => {
    const dispatch = useDispatch();
    const mapCoords = useSelector(state => state.mapInput.mapCoords);
    const map = useMapEvents({
        click(event) {
          const coords = event.latlng;
          dispatch(mapInputActions.setMapCoords([coords.lat, coords.lng]));
        },
      });
    useEffect(() => {
        if(mapCoords)map.flyTo(mapCoords)
    }, [mapCoords])
  return <></>
}

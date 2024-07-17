import React from "react";
import { mapInputActions } from "../../store/mapInputSlice";
import { useDispatch } from "react-redux";

export const ResultItem = ({ result, clearResults }) => {
  const dispatch = useDispatch();
  function onClick(e) {
    e.preventDefault();
    const coords = [
      result.geometry.location.lat(),
      result.geometry.location.lng(),
    ];
    dispatch(mapInputActions.setMapCoords(coords));
    clearResults();
  }
  return (
    <li>
      <button onClick={onClick}>
        {<p className="text-xs">{result.formatted_address}</p>}
      </button>
    </li>
  );
};

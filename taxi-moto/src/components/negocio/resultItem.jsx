import React from "react";
import { mapInputActions } from "../../store/mapInputSlice";
import { useDispatch } from "react-redux";

export const ResultItem = ({ result, clearResults }) => {
  const dispatch = useDispatch();
  function onClick(e) {
    e.preventDefault();
    const coords = [result.lat, result.lon];
    dispatch(mapInputActions.setMapCoords(coords));
    clearResults();
  }
  return (
    <li>
      <button onClick={onClick}>
        {<p className="text-xs">{result.display_name}</p>}
      </button>
    </li>
  );
};

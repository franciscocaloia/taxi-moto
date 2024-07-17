import React, { useState } from 'react'
import { ResultsList } from '../negocio/resultsList';
import { Loader } from '@googlemaps/js-api-loader';
import logoSearch from '../../assets/logoSearch.svg';

const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });

export const GeocodeInput = ({directionValue,directionChangeHandler,directionBlurHandler,directionError}) => {
    const [directionResults, setDirectionResults] = useState();
    async function clearResults() {
        setDirectionResults();
      }
    async function geoCodeHandler(event) {
        event.preventDefault();
        loader.load().then((google) => {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            { address: directionValue + " Esperanza" },
            (results, status) => {
              if (status == "OK") {
                setDirectionResults(results);
              } else {
                setDirectionResults();
              }
            }
          );
        });
      }
  return (
    <div className="form-control my-3 lg:m-6 col-start-1">
    <label className="font-monserrat" htmlFor="name">
      Dirección
    </label>
    <div className="flex gap-1">
      <input
        id="direction"
        name="direction"
        placeholder="Escriba aqui"
        value={directionValue}
        onChange={directionChangeHandler}
        onBlur={directionBlurHandler}
        type="text"
        className={`input input-bordered input-primary w-full focus:outline-none ${
          directionError && "input-error"
        }`}
      />
      <button className="btn btn-primary" onClick={geoCodeHandler}>
        <img className="h-1/2" src={logoSearch} alt="logo search" />
      </button>
    </div>
    <ResultsList results={directionResults} clearResults={clearResults} />
    {directionError && (
      <div className="relative">
        <p className="absolute text-error">
          Ingrese una direccion válida
        </p>
      </div>
    )}
  </div>
  )
}

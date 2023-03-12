import React, { useState } from "react";
import { Form } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { isValidText } from "../../utils/validation";
import { MapInputForm } from "./mapInputForm";
import { NominatimJS } from "@owsas/nominatim-js";
import { ResultsList } from "./resultsList";
import logoSearch from "../../assets/logoSearch.svg";
import { useSelector } from "react-redux";
export const NewPedidoForm = () => {
  const state = useSelector((state) => state);
  const [directionResults, setDirectionResults] = useState();
  const {
    inputValue: directionValue,
    inputValid: directionValid,
    inputError: directionError,
    inputChangeHandler: directionChangeHandler,
    inputBlurHandler: directionBlurHandler,
  } = useInput(isValidText); //direccion
  const {
    inputValue: phoneValue,
    inputValid: phoneValid,
    inputError: phoneError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput(isValidText); //telefono
  const {
    inputValue: amountValue,
    inputValid: amountValid,
    inputError: amountError,
    inputChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput(isValidText); //Monto
  const {
    inputValue: dateValue,
    inputValid: dateValid,
    inputError: dateError,
    inputChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput(); //horario
  async function geoCodeHandler(event) {
    event.preventDefault();
    const results = await NominatimJS.search({
      q: directionValue,
      country: "Argentina",
      limit: 6,
    });
    setDirectionResults(results);
  }
  async function clearResults() {
    setDirectionResults();
  }
  function submitHandler(e) {}

  return (
    <div className="w-screen sm:w-2/3 mx-auto flex">
      <Form
        // onSubmit={submitHandler}
        method="post"
        className="w-screen mt-0 sm:w-1/2 sm:mx-auto"
      >
        <input
          name="state"
          type="hidden"
          value={JSON.stringify(state) ?? ""}
        ></input>
        <div className="form-control p-6">
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
          <ResultsList
            results={directionResults}
            // onDirectionResultSelect={onDirectionResultSelect}
            clearResults={clearResults}
          />
          {directionError && (
            <div className="relative">
              <p className="absolute text-error">
                Ingrese una direccion válida
              </p>
            </div>
          )}
        </div>
        <div className="form-control p-6">
          <label className="font-monserrat" htmlFor="name">
            Telefono
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="Escriba aqui"
            value={phoneValue}
            onChange={phoneChangeHandler}
            onBlur={phoneBlurHandler}
            type="number"
            className={`input input-bordered input-primary w-full focus:outline-none ${
              phoneError && "input-error"
            }`}
          />
          {phoneError && (
            <div className="relative">
              <p className="absolute text-error">Ingrese un telefono válido</p>
            </div>
          )}
        </div>
        <div className="form-control  p-6">
          <label className="font-monserrat" htmlFor="name">
            Total
          </label>
          <input
            id="amount"
            name="amount"
            placeholder="Escriba aqui"
            value={amountValue}
            onChange={amountChangeHandler}
            onBlur={amountBlurHandler}
            type="number"
            className={`input input-bordered input-primary w-full focus:outline-none ${
              amountError && "input-error"
            }`}
          />
          {amountError && (
            <div className="relative">
              <p className="absolute text-error">Ingrese un monto válido</p>
            </div>
          )}
        </div>
        <div className="form-control p-6">
          <label className="font-monserrat" htmlFor="name">
            Hora de entrega (Dejar vacio si es entrega inmediata)
          </label>
          <input
            id="date"
            name="date"
            placeholder="Escriba aqui"
            value={dateValue}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
            type="time"
            className={`input input-bordered input-primary w-full  focus:outline-none ${
              dateError && "input-error"
            }`}
          />
          {dateError && (
            <div className="relative">
              <p className="absolute text-error">Ingrese una hora valida</p>
            </div>
          )}
        </div>
        <div className="form-control items-center p-6">
          <button className="btn btn-primary hover:btn-primary-focus w-full">
            Ingresar
          </button>
        </div>
      </Form>
      <div className="w-screen sm:w-1/2 py-6">
        <MapInputForm />
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import useInput from "../../hooks/useInput";
import { isValidText } from "../../utils/validation";
import { MapInputForm } from "./mapInputForm";
import { Loader } from "@googlemaps/js-api-loader";
import { ResultsList } from "./resultsList";
import logoSearch from "../../assets/logoSearch.svg";
import { useDispatch, useSelector } from "react-redux";
import { mapInputActions } from "../../store/mapInputSlice";
import { toast } from "react-toastify";
const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});
export const PedidoForm = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const state = useSelector((state) => state);
  const error = useActionData();
  useEffect(() => {
    if (order) {
      dispatch(mapInputActions.setMapCoords(order.route.to));
    }
    if (error?.data) {
      toast.error("Error: " + error.data.message);
    }
  }, [error]);

  const [directionResults, setDirectionResults] = useState();
  const {
    inputValue: directionValue,
    inputValid: directionValid,
    inputError: directionError,
    inputChangeHandler: directionChangeHandler,
    inputBlurHandler: directionBlurHandler,
  } = useInput(isValidText, order?.direction); //direccion
  const {
    inputValue: phoneValue,
    inputValid: phoneValid,
    inputError: phoneError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput(isValidText, order?.phone); //telefono
  const {
    inputValue: amountValue,
    inputValid: amountValid,
    inputError: amountError,
    inputChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
  } = useInput(isValidText, order?.totalAmount.amount); //Monto
  const {
    inputValue: dateValue,
    inputValid: dateValid,
    inputError: dateError,
    inputChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
  } = useInput(() => true, order?.date); //horario
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
            setDirectionResults([]);
          }
        }
      );
    });
  }
  async function clearResults() {
    setDirectionResults();
  }
  function submitHandler(e) {
    dispatch(mapInputActions.reset());
  }
  return (
    <div className="w-full  lg:w-4/5 p-6 mx-auto">
      <Form
        onSubmit={submitHandler}
        method="post"
        className="w-full mt-0 p-6 bg-base-100 lg:p-0 grid grid-cols-1 lg:grid-cols-2"
      >
        <input
          name="order"
          type="hidden"
          value={JSON.stringify(order) ?? ""}
        ></input>
        <input
          name="state"
          type="hidden"
          value={JSON.stringify(state) ?? ""}
        ></input>
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
        <div className="form-control my-3 lg:m-6 col-start-1">
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
        <div className="form-control my-3 lg:m-6 col-start-1">
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
        <div className="form-control my-3 lg:m-6 col-start-1">
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
        <div
          className={`w-full relative h-80 my-6 lg:p-6 lg:m-0 lg:h-full row-start-2 lg:row-start-1 lg:row-span-5 lg:col-start-2 ${
            error?.map && "border border-error"
          }`}
        >
          <MapInputForm />
          {error?.map && (
            <smal className="absolute w-full text-base-100 bg-error top-full lg:bottom-0 lg:top-auto left-0 text-center">
              {error.map}
            </smal>
          )}
        </div>
        <div className="form-control flex-row gap-2 items-center my-3 col-start-1 lg:m-6 ">
          {order && (
            <button
              className="btn btn-primary hover:btn-primary-focus w-1/2"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          )}
          <button
            disabled={
              !(directionValid && phoneValid && amountValid) ||
              navigation.state === "submitting"
            }
            className={`btn btn-primary hover:btn-primary-focus ${
              order ? "w-1/2" : "w-full"
            }`}
          >
            Confirmar pedido
          </button>
        </div>
      </Form>
    </div>
  );
};

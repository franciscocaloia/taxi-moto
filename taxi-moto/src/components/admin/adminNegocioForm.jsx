import React, { useEffect } from "react";
import useInput from "../../hooks/useInput";
import { Form, useActionData } from "react-router-dom";
import { isValidText } from "../../utils/validation";
import { GeocodeInput } from "../utils/geocodeInput";
import { MapInput } from "../utils/mapInput";
import { useDispatch, useSelector } from "react-redux";
import { mapInputActions } from "../../store/mapInputSlice";
import { toast } from "react-toastify";

export const AdminNegocioForm = ({ negocio }) => {
  const {
    inputValue: nameValue,
    inputValid: nameValid,
    inputError: nameError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isValidText, negocio?.name);
  const {
    inputValue: directionValue,
    inputValid: directionValid,
    inputError: directionError,
    inputChangeHandler: directionChangeHandler,
    inputBlurHandler: directionBlurHandler,
  } = useInput(isValidText, negocio?.direction);
  const {
    inputValue: userNameValue,
    inputValid: userNameValid,
    inputError: userNameError,
    inputChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
  } = useInput(isValidText, negocio?.username);
  const {
    inputValue: passwordValue,
    inputValid: passwordValid,
    inputError: passwordError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(() => true,"");
  const {
    inputValue: phoneValue,
    inputValid: phoneValid,
    inputError: phoneError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput(isValidText, negocio?.phone); //telefono
  const {
    inputValue: imageValue,
    inputValid: imageValid,
    inputError: imageError,
    inputChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
  } = useInput(()=>true, null); //telefono

  const state = useSelector((state) => state);
  const error = useActionData();
  const dispatch = useDispatch();
  useEffect(() => {
    if (negocio) {
      dispatch(mapInputActions.setMapCoords(order.route.to));
    } else {
      dispatch(mapInputActions.reset());
    }
    if (error?.data) {
      toast.error("Error: " + error.data);
    }
  }, [error]);
  return (
    <div className="w-full  lg:w-4/5 p-6 mx-auto">
      <Form 
      encType="multipart/form-data"
      // onSubmit={submitHandler}
      method="post"
      className="w-full mt-0 p-6 bg-base-100 lg:p-0 grid grid-cols-1 lg:grid-cols-2"
        >
        <input
          name="state"
          type="hidden"
          value={JSON.stringify(state) ?? ""}
        ></input>
        <div className="form-control my-3 lg:m-6 col-start-1">
          <label className="font-monserrat" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            placeholder="Nombre"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            type="text"
            className={`input input-bordered input-primary w-full focus:outline-none ${
              nameError && "input-error"
            }`}
          />
          {nameError && (
            <div className="relative">
              <p className="absolute text-error">Ingrese un nombre válido</p>
            </div>
          )}
        </div>
        <GeocodeInput {...{directionValue,directionChangeHandler,directionBlurHandler,directionError}}/>
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
            Nombre de usuario
          </label>
          <input
            id="userName"
            name="userName"
            placeholder="Nombre de usuario"
            value={userNameValue}
            onChange={userNameChangeHandler}
            onBlur={userNameBlurHandler}
            type="text"
            className={`input input-bordered input-primary w-full focus:outline-none ${
              userNameError && "input-error"
            }`}
          />
          {userNameError && (
            <div className="relative">
              <p className="absolute text-error">
                Ingrese un nombre de usuario válido
              </p>
            </div>
          )}
        </div>
        <div className="form-control my-3 lg:m-6 col-start-1">
          <label className="font-monserrat" htmlFor="name">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            placeholder="Contraseña"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="text"
            className={`input input-bordered input-primary w-full focus:outline-none ${
              passwordError && "input-error"
            }`}
          />
          {passwordError && (
            <div className="relative">
              <p className="absolute text-error">Ingrese una contraseña válida</p>
            </div>
          )}
        </div>
        <div className="form-control my-3 lg:m-6 col-start-1">
          <label className="font-monserrat" htmlFor="name">
            Contraseña
          </label>
          <input
            id="image"
            name="image"
            placeholder="Imagen"
            value={imageValue}
            onChange={imageChangeHandler}
            onBlur={imageBlurHandler}
            type="file"
            className={`input input-bordered input-primary w-full focus:outline-none ${
              imageError && "input-error"
            }`}
          />
          {imageError && (
            <div className="relative">
              <p className="absolute text-error">Ingrese una contraseña válida</p>
            </div>
          )}
        </div>
        <div
            className={`w-full relative h-80 my-6 lg:p-6 lg:m-0 lg:h-full row-start-1 lg:row-start-1 lg:row-span-6 lg:col-start-2`}
          >
            <MapInput/>
        </div>
        <div className="form-control my-3 lg:m-6 col-span-2">
          <button
            disabled={
              !(nameValid && directionValid && phoneValid && userNameValid) ||
              navigation.state === "submitting"
            }
            className={"btn btn-primary hover:btn-primary-focus"}
          >
            Confirmar pedido
          </button>
        </div>
      </Form>
    </div>
  );
};

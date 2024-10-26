import React from "react";
import useInput from "../../hooks/useInput";
import { Form } from "react-router-dom";
import { isValidText } from "../../utils/validation";

export const AdminCadetesForm = ({ cadete }) => {
  const {
    inputValue: firstNameValue,
    inputValid: firstNameValid,
    inputError: firstNameError,
    inputChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isValidText, cadete?.firstname);
  const {
    inputValue: lastNameValue,
    inputValid: lastNameValid,
    inputError: lastNameError,
    inputChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isValidText, cadete?.lastname);
  const {
    inputValue: userNameValue,
    inputValid: userNameValid,
    inputError: userNameError,
    inputChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
  } = useInput(isValidText, cadete?.username);
  const {
    inputValue: passwordValue,
    inputValid: passwordValid,
    inputError: passwordError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(() => true, cadete?.password);
  const {
    inputValue: phoneValue,
    inputValid: phoneValid,
    inputError: phoneError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput(isValidText, cadete?.phone); //telefono
  return (
    <Form
      className="w-full lg:w-3/5 p-6 mx-auto bg-base-100 my-3"
      method="post"
    >
      <div className="form-control my-3 lg:m-6">
        <label className="font-monserrat" htmlFor="name">
          Nombre
        </label>
        <input
          id="firstName"
          name="firstName"
          placeholder="Nombre"
          value={firstNameValue}
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          type="text"
          className={`input input-bordered input-primary w-full focus:outline-none ${
            firstNameError && "input-error"
          }`}
        />
        {firstNameError && (
          <div className="relative">
            <p className="absolute text-error">Ingrese un nombre válido</p>
          </div>
        )}
      </div>
      <div className="form-control my-3 lg:m-6">
        <label className="font-monserrat" htmlFor="name">
          Apellido
        </label>
        <input
          id="lastName"
          name="lastName"
          placeholder="Apellido"
          value={lastNameValue}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          type="text"
          className={`input input-bordered input-primary w-full focus:outline-none ${
            lastNameError && "input-error"
          }`}
        />
        {lastNameError && (
          <div className="relative">
            <p className="absolute text-error">Ingrese un apellido valido</p>
          </div>
        )}
      </div>
      <div className="form-control my-3 lg:m-6">
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
      <div className="form-control my-3 lg:m-6">
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
      <div className="form-control my-3 lg:m-6">
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
      <div className="form-control my-3 lg:m-6">
        <button
          disabled={
            !(firstNameValid && lastNameValid && phoneValid && userNameValid) ||
            navigation?.state === "submitting"
          }
          className={"btn btn-primary hover:btn-primary-focus"}
        >
          Confirmar pedido
        </button>
      </div>
    </Form>
  );
};

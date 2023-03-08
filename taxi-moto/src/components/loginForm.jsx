import React from "react";
import { Form } from "react-router-dom";
import useInput from "../hooks/useInput";

function notEmpty(value) {
  return value.trim() !== "";
}

export const LoginForm = () => {
  const {
    inputValue: nameValue,
    inputValid: nameValid,
    inputError: nameError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(notEmpty);
  const {
    inputValue: passwordValue,
    inputValid: passwordValid,
    inputError: passwordError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(notEmpty);
  return (
    <section className="flex flex-1">
      <Form
        method="post"
        className="w-screen mt-0 sm:w-2/3 sm:mt-20 sm:mx-auto"
      >
        <div className="form-control items-center p-6">
          <label className="font-monserrat" htmlFor="name">
            Nombre de usuario
          </label>
          <input
            id="username"
            name="username"
            placeholder="Escriba aqui"
            value={nameValue}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            type="text"
            className={`input input-bordered input-primary w-full max-w-xs focus:outline-none ${
              nameError && "input-error"
            }`}
          />
        </div>
        <div className="form-control items-center p-6">
          <label className="font-monserrat " htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            placeholder="Escriba aqui"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type="password"
            className={`input input-bordered input-primary w-full max-w-xs focus:outline-none ${
              passwordError && "input-error"
            }`}
          />
        </div>
        <div className="form-control items-center p-6">
          <button
            className="btn btn-primary hover:btn-primary-focus w-full max-w-xs"
            disabled={!(passwordValid && nameValid)}
          >
            Ingresar
          </button>
        </div>
      </Form>
    </section>
  );
};

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
  } = useInput(isValidText, cadete?.password);
  const {
    inputValue: phoneValue,
    inputValid: phoneValid,
    inputError: phoneError,
    inputChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
  } = useInput(isValidText, cadete?.phone); //telefono
  return (
    <Form>
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
    </Form>
  );
};

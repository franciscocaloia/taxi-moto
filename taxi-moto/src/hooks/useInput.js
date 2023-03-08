import { useMemo, useState } from "react";

const useInput = (validateInput) => {
  const [inputValue, setInputValue] = useState("");
  const [inputChanged, setInputChanged] = useState(false);

  const inputValid = useMemo(
    () => validateInput(inputValue),
    [inputValue, validateInput]
  );

  const inputError = !inputValid && inputChanged;

  function inputChangeHandler(event) {
    setInputValue(event.target.value);
  }

  function inputBlurHandler(event) {
    setInputChanged(true);
  }

  function inputBlurHandler(event) {
    setInputChanged(true);
  }

  function reset() {
    setInputValue("");
    setInputChanged(false);
  }

  return {
    inputValue,
    inputValid,
    inputError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};
export default useInput;

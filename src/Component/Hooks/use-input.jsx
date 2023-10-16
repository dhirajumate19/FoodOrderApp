import { useState } from "react";

const useInput = (validateData) => {
  const [inputData, setInputData] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const inputDataValid = validateData(inputData);
  const hasError = !inputDataValid && isTouched;

  const inputChangeHandler = (e) => {
    setInputData(e.target.value);
  };
  const onBlurChangeHandler = () => {
    setIsTouched(true);
  };
  const onReset = () => {
    setInputData("");
    setIsTouched(false);
  };
  return {
    inputData: inputData,
    hasError,
    inputDataValid: inputDataValid,
    inputChangeHandler,
    onBlurChangeHandler,
    onReset,
  };
};
export default useInput;

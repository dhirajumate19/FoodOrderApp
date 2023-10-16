import useInput from "../../Hooks/use-input";
import classes from "./Checkoutform.module.css";

const CheckoutForm = (props) => {
  const {
    inputData: fName,
    inputDataValid: validFirstName,
    hasError: firstNameError,
    inputChangeHandler: onFnameChangeHandler,
    onBlurChangeHandler: onBlurFnameChangeHandler,
    onReset: onResetFname,
  } = useInput((value) => value.trim() !== "");

  const {
    inputData: lName,
    inputDataValid: validLastName,
    hasError: lNameError,
    inputChangeHandler: onLnameChangeHandler,
    onBlurChangeHandler: onBlurLnameChangeHandler,
    onReset: onResetLname,
  } = useInput((value) => value.trim() !== "");

  const {
    inputData: email,
    inputDataValid: validEmail,
    hasError: emailError,
    inputChangeHandler: onEmailChangeHandler,
    onBlurChangeHandler: onBlurEmailChangeHandler,
    onReset: onResetEmail,
  } = useInput((value) => value.includes("@"));
  const {
    inputData: address,
    inputDataValid: validAddress,
    hasError: addressError,
    inputChangeHandler: onAddressChangeHandler,
    onBlurChangeHandler: onBlurAddressChangeHandler,
    onReset: onResetAddress,
  } = useInput((value) => value.trim() !== "");
  const {
    inputData: number,
    inputDataValid: validNumber,
    hasError: numberError,
    inputChangeHandler: onNumberChangeHandler,
    onBlurChangeHandler: onBlurNumberChangeHandler,
    onReset: onResetNumber,
  } = useInput((value) => value.length === 10);
  const {
    inputData: pCode,
    inputDataValid: validPinCode,
    hasError: pCodeError,
    inputChangeHandler: onPcodeChangeHandler,
    onBlurChangeHandler: onBlurPCodeChangeHandler,
    onReset: onResetPcode,
  } = useInput((value) => value.length === 6);

  let formValid = false;
  if (
    validFirstName &&
    validLastName &&
    validAddress &&
    validEmail &&
    validNumber &&
    validPinCode
  ) {
    formValid = true;
  }
  const comfirmHandler = (e) => {
    e.preventDefault();
    if (!formValid) {
      return;
    }

    console.log("form submit");
    props.onComfirm({
      firstName: fName,
      lastNaame: lName,
      email: email,
      address: address,
      mobileNumber: number,
      postalCode: pCode,
    });
    onResetFname();
    onResetLname();
    onResetEmail();
    onResetAddress();
    onResetNumber();
    onResetPcode();
  };
  // const firstNameControl = `${classes.control} ${
  //   firstNameError ? "" : classes.invalid
  // }`;
  const firstNameControl = firstNameError ? classes.invalid : classes.control;
  const lastNameControl = lNameError ? classes.invalid : classes.control;
  const emailControl = emailError ? classes.invalid : classes.control;
  const addressControl = addressError ? classes.invalid : classes.control;
  const numberControl = numberError ? classes.invalid : classes.control;
  const pCodeControl = pCodeError ? classes.invalid : classes.control;
  return (
    <>
      <form onSubmit={comfirmHandler} className={classes.form}>
        <div className={firstNameControl}>
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            id="fName"
            onChange={onFnameChangeHandler}
            onBlur={onBlurFnameChangeHandler}
            value={fName}
          />
          {firstNameError && <p> Enter valid First Name</p>}
        </div>
        <div className={lastNameControl}>
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            name=""
            id="lnName"
            onChange={onLnameChangeHandler}
            onBlur={onBlurLnameChangeHandler}
            value={lName}
          />
          {lNameError && <p> Enter valid Last Name</p>}
        </div>
        <div className={emailControl}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            name=""
            id="email"
            onChange={onEmailChangeHandler}
            onBlur={onBlurEmailChangeHandler}
            value={email}
          />
          {emailError && <p> Enter valid Email Address</p>}
        </div>
        <div className={numberControl}>
          <label htmlFor="number">Mobile Number</label>
          <input
            type="number"
            name=""
            id="number"
            onChange={onNumberChangeHandler}
            onBlur={onBlurNumberChangeHandler}
            value={number}
          />
          {numberError && <p> Enter valid mobile number</p>}
        </div>
        <div className={addressControl}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name=""
            id="addtress"
            onChange={onAddressChangeHandler}
            onBlur={onBlurAddressChangeHandler}
            value={address}
          />
          {addressError && <p> Enter valid address</p>}
        </div>
        <div className={pCodeControl}>
          <label htmlFor="pCode">Postal Code</label>
          <input
            type="text"
            name=""
            id="pCode"
            max={6}
            onChange={onPcodeChangeHandler}
            onBlur={onBlurPCodeChangeHandler}
            value={pCode}
          />
          {pCodeError && <p> Enter Valid Postal Code</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancle}>
            Checkout Cancle
          </button>
          <button disabled={!formValid} className={classes.submit}>
            Checkout Order
          </button>
        </div>
      </form>
    </>
  );
};
export default CheckoutForm;

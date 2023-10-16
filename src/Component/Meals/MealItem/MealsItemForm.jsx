import { useState } from "react";
import { useRef } from "react";
import Input from "../../UI/Input";
import classess from "./MealsItemForm.module.css";
const MealsItemForm = (props) => {
  const [amountIsValid, setAmountISValid] = useState(true);
  const amountInputRef = useRef();
  const submitHnadler = (e) => {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountISValid(false);
      return;
    }

    props.onAddToCartItem(enteredAmountNumber);
    return;
  };
  return (
    <div>
      <form className={classess.form} onSubmit={submitHnadler}>
        <Input
          ref={amountInputRef}
          lable="Amount"
          input={{
            id: "Amount" + props.id,
            type: "number",
            min: "1",
            max: "5",
            defaultValue: "1",
            step: "1",
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>Please enter a valid amount (1 to 5)</p>}
      </form>
    </div>
  );
};
export default MealsItemForm;

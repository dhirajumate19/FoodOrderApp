import { useContext } from "react";
import classess from "./MealsItem.module.css";
import MealsItemForm from "./MealsItemForm";
import CartContext from "../../../Store/CartContext";
const MealsItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;
  // console.log("price" + price);
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classess.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classess.description}>{props.description}</div>
        <div className={classess.price}>{price}</div>
      </div>
      <div>
        {" "}
        <MealsItemForm id={props.id} onAddToCartItem={addToCartHandler} />
      </div>
    </li>
  );
};
export default MealsItem;

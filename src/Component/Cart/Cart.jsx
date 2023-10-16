import { useContext, useState } from "react";
import Model from "../UI/Model";
import classess from "./Cart.module.css";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
import CheckoutForm from "./Checkout/CheckoutForm";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitting, setDidSubmitting] = useState(false);
  const conCtx = useContext(CartContext);

  const totalAmount = `$${conCtx.totalAmount.toFixed(2)}`;
  const cartEmpty = conCtx.items.length > 0;

  const onRemoveHandler = (id) => {
    conCtx.removeItem(id);
  };
  const onAddHandler = (item) => {
    conCtx.addItem({ ...item, amount: 1 });
  };

  const onOrderClickHandler = () => {
    setIsCheckout(true);
  };
  const submitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-8fb01-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItem: conCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmitting(true);
    conCtx.clearCart();
  };
  const cartItems = (
    <ul className={classess["cart-items"]}>
      {conCtx.items.map((item) => (
        <li>
          <CartItem
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={onRemoveHandler.bind(null, item.id)}
            onAdd={onAddHandler.bind(null, item)}
          />
        </li>
      ))}
    </ul>
  );
  const modelAction = (
    <div className={classess.actions}>
      <button className={classess["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {cartEmpty && (
        <button className={classess.button} onClick={onOrderClickHandler}>
          Order
        </button>
      )}
    </div>
  );
  const cartModel = (
    <>
      {" "}
      {cartItems}
      <div className={classess.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckoutForm onComfirm={submitHandler} onCancle={props.onClose} />
      )}
      {!isCheckout && modelAction}
    </>
  );
  const isSubmittingModelContent = <p>Sending order data...</p>;
  const didSubmitingModelContent = (
    <>
      <p>Susscessfully sent order</p>
      <div className={classess.actions}>
        <button className={classess["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );
  return (
    <Model onClose={props.onClose}>
      {!isSubmitting && !didSubmitting && cartModel}
      {isSubmitting && isSubmittingModelContent}
      {!isSubmitting && didSubmitting && didSubmitingModelContent}
    </Model>
  );
};
export default Cart;

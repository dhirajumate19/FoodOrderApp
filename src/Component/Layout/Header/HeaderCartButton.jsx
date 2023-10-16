import React from "react";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../../Store/CartContext";
import CartIcon from "../../Cart/CartIcon";
import classess from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  // console.log(numberOfCartItems);
  const { items } = cartCtx;
  const btnClasses = `${classess.button} ${
    btnHighlighted ? classess.bump : ""
  }`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classess.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classess.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;

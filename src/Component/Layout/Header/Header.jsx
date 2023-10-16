import React from "react";
import mealsjpg from "../../../asset/meals.jpg";
import classess from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classess.header}>
        {" "}
        <h1>Meals </h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classess["main-image"]}>
        <img src={mealsjpg} alt=" Image content delisious food" />
      </div>
    </>
  );
};

export default Header;

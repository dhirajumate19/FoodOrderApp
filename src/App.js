import Header from "./Component/Layout/Header/Header";
import Meals from "./Component/Meals/Meals";
import Cart from "./Component/Cart/Cart";
import { useState } from "react";
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartItem, setShowCartItem] = useState(false);
  const showCartItemHandler = () => {
    setShowCartItem(true);
  };
  const hideCartItemHandler = () => {
    setShowCartItem(false);
  };

  return (
    <CartProvider>
      {cartItem && <Cart onClose={hideCartItemHandler} />}
      <Header onShowCart={showCartItemHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

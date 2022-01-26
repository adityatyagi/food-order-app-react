import React from "react";

// cart context with the initial state which actually gives the shape to the context. The IDE will be able to identify things only which are passed here.
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {}
});
export default CartContext;

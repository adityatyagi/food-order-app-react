import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (prevState, action) => {
    if (action.type === "ADD") {
        // check if the item is already present
        // concat returns a new array, .push edits the current array
        // using concat is important because you want to update the state in an immutable way
        // const updatedItems = prevState.items.concat(action.item);
        const updatedTotalAmount =
            prevState.totalAmount + action.item.price * action.item.amount;
        const exisitingCardItemIndex = prevState.items.findIndex(
            (item) => item.id === action.item.id
        );
        const exisitingCartItem = prevState.items[exisitingCardItemIndex];

        let updatedItems = [];
        if (exisitingCartItem) {
            const updatedItem = {
                ...exisitingCartItem,
                amount: exisitingCartItem.amount + action.item.amount
            };
            updatedItems = [...prevState.items];
            updatedItems[exisitingCardItemIndex] = updatedItem;
        } else {
            updatedItems = prevState.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === "REMOVE") {
        const exisitingCardItemIndex = prevState.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = prevState.items[exisitingCardItemIndex];
        const updatedTotalAmount =
            prevState.totalAmount - existingCartItem.price;
        let updatedItems;

        // check if this is the last item
        if (existingCartItem.amount === 1) {
            updatedItems = prevState.items.filter(
                (item) => item.id !== action.id
            );
        } else {
            // keep the item in the cart but decrease the amount
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1
            };
            updatedItems = [...prevState.items];
            updatedItems[exisitingCardItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    // return new state
    return defaultCartState;
};

// returns a Provider component
// will create a wrapper component to access the cart context
const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );
    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: "ADD",
            item: item
        });
    };
    const removeItemCartHandler = (id) => {
        dispatchCartAction({
            type: "REMOVE",
            id: id
        });
    };
    // the object that will be the actual initial state and will be updated by useState and useReducers
    // this will be dynamic
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemCartHandler
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};
export default CartProvider;

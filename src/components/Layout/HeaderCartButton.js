import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import { useEffect } from "react";
const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    // using the cart context
    const cartCtx = useContext(CartContext);
    // only count unique values in the cart
    // add 1 item for an item with more than 1 qty.
    const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
        // currNumber will be the result the function returns
        return currNumber + item.amount;
    }, 0);
    const { items } = cartCtx;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        // cleanup function - clear that timer in case the component is removed
        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    const btnClasses = `${classes.button} ${
        btnIsHighlighted ? classes.bump : ""
    }`;
    return (
        <button className={btnClasses} {...props}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};
export default HeaderCartButton;

import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const subtotal = getCartAmount(); // Avoid multiple calls
    const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1="CART" text2="TOTALS" />
            </div>

            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency} {subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping Fee</p>
                    <p>{currency} {delivery_fee.toFixed(2)}</p>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                    <p>Total</p>
                    <p>{currency} {total.toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;

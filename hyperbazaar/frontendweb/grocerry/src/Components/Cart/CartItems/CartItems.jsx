// components/CartItems/CartItems.js

import React, { useContext } from 'react';
import CartItemCard from '../CartItemCard/CartItemCard';
import { groceryContext } from '../../Layout/Layout';

const CartItems = () => {
    // Get Cart Items from Context
    const { cartItemsState } = useContext(groceryContext);
    const [cartItems, setCartItems] = cartItemsState;

    // Function to handle removing items from cart
    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
        handleSessionStorage('set', 'cartItems', updatedCartItems);
    };

    return (
        <div className='lg:space-y-10 space-y-5'>
            {/* Title */}
            <h2 className='lg:text-2xl sm:text-xl text-lg sm:font-semibold font-bold '>
                Selected Items
            </h2>

            {/* Items Card list */}
            <div className='space-y-3'>
                {cartItems.map(cartItem => (
                    <CartItemCard
                        item={cartItem}
                        key={cartItem.id}
                        removeFromCart={() => removeFromCart(cartItem.id)} // Pass remove function
                    />
                ))}
            </div>
        </div>
    );
};

export default CartItems;

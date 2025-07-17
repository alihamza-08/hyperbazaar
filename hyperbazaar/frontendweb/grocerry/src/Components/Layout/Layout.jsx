// components/Layout/Layout.js

import React, { createContext, useState } from 'react';
import { handleSessionStorage } from '../../utils/utils';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export const groceryContext = createContext();

const Layout = () => {
    // Initialize state from session storage or default to empty array
    const cartItemsFromSessionStorage = handleSessionStorage('get', 'cartItems') || [];

    // State for user login status
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Example initial value

    // State for cart items
    const [cartItems, setCartItems] = useState(cartItemsFromSessionStorage);

    return (
        <groceryContext.Provider
            value={{
                userLoggedInState: [isUserLoggedIn, setIsUserLoggedIn],
                cartItemsState: [cartItems, setCartItems],
            }}
        >
            <Navbar />
            <section className="min-h-screen">
                <Outlet />
            </section>
            <Footer />
        </groceryContext.Provider>
    );
};

export default Layout;

import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
    const setLocalStorage = typeof window !== "undefined" ? window.localStorage : null;
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if(cartProducts?.length > 0) {
            setLocalStorage.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts])

    useEffect(() => {
        if(setLocalStorage && setLocalStorage.getItem('cart')) {
            setCartProducts(JSON.parse(setLocalStorage.getItem('cart')));
        }
    }, [])
    
    function addProduct(productId) {
        setCartProducts(prev => [...prev, productId]);
    }

    function removeProduct(productId) {
        setCartProducts(prev => {
            const positionInArray = prev.indexOf(productId);
            if(positionInArray !== -1) {
                return prev.filter((value, index) => index !== positionInArray);
            }
            return prev;
        })
    }
    
    return (
        <CartContext.Provider value={{cartProducts, setCartProducts, addProduct, removeProduct}}>
            {children}
        </CartContext.Provider>
    )
}
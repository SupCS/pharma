import { useState, useEffect } from 'react';

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const addProduct = (productWithPharmacy) => {
    const updatedCart = [...cartItems];
    const existingProductIndex = updatedCart.findIndex(item => item._id === productWithPharmacy._id);

    if (existingProductIndex >= 0) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      const newProduct = { ...productWithPharmacy, quantity: 1 };
      updatedCart.push(newProduct);
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeProduct = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateProductQuantity = (productId, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item._id === productId) {
        const updatedQuantity = item.quantity + delta;
        return { ...item, quantity: Math.max(0, updatedQuantity) };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return { cartItems, addProduct, removeProduct, updateProductQuantity, clearCart };
};

export default useCart;

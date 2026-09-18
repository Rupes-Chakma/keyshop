import React, { createContext, useState, useEffect } from "react";

// ১. CartContext এক্সপোর্ট করা (এটি খুব জরুরি)
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem("cart");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);

  // কার্টে প্রোডাক্ট যোগ করা
  const addToCart = (product) => {
    setCart((prevCart) => {
      const defaultEditionObj =
        product.editions && product.editions.length > 0
          ? product.editions[0]
          : null;

      const itemPrice =
        product.price || (defaultEditionObj ? defaultEditionObj.price : 499);
      const itemEdition =
        product.selectedEdition ||
        (defaultEditionObj
          ? defaultEditionObj.name
          : product.versionName || "Standard");

      const existingIndex = prevCart.findIndex(
        (item) =>
          item.id === product.id && item.selectedEdition === itemEdition,
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity =
          (updatedCart[existingIndex].quantity || 1) + 1;
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          ...product,
          price: Number(itemPrice),
          selectedEdition: itemEdition,
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  // কার্ট থেকে নির্দিষ্ট প্রোডাক্ট এবং এডিশন রিমুভ করা
  const removeFromCart = (id, selectedEdition) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === id && item.selectedEdition === selectedEdition),
      ),
    );
  };

  // কার্ট খালি করা
  const clearCart = () => {
    setCart([]);
  };

  // সর্বমোট মূল্য হিসাব
  const totalPrice = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return sum + price * quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

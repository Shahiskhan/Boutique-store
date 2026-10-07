// src/context/CartContext.jsx
import { createContext, useState, useEffect, useContext } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('boutique-cart')
    return stored ? JSON.parse(stored) : []
  })

  // localStorage mein save karo
  useEffect(() => {
    localStorage.setItem('boutique-cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }

      return [...prev, { ...product, quantity }]
    })
  }

  // Remove from cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  // Total items
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
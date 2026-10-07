// src/context/WishlistContext.jsx
import { createContext, useState, useEffect, useContext } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem('boutique-wishlist')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('boutique-wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  // Toggle wishlist (add/remove)
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  // Check if in wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id)
  }

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
        totalWishlist: wishlistItems.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
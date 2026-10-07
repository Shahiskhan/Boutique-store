// src/pages/Wishlist.jsx
import { Link } from 'react-router-dom'
import { FaHeart, FaTrash, FaShoppingBag } from 'react-icons/fa'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

function Wishlist() {
  const { wishlistItems, clearWishlist, totalWishlist } = useWishlist()
  const { addToCart } = useCart()

  // Empty wishlist
  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-primary-100 rounded-full 
                          flex items-center justify-center mx-auto mb-6">
            <FaHeart className="text-primary-600" size={36} />
          </div>
          <h1 className="font-serif text-4xl text-text mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="font-sans text-text-muted mb-8">
            Save your favorite items here to shop them later.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 
                       bg-primary-500 text-white px-8 py-4 rounded-lg 
                       font-sans text-sm uppercase tracking-wider 
                       hover:bg-primary-600 transition-colors duration-normal"
          >
            Explore Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end 
                      justify-between gap-4 mb-10">
        <div>
          <p className="font-sans text-xs uppercase tracking-widest 
                        text-primary-500 mb-2">
            Saved for Later
          </p>
          <h1 className="font-serif text-5xl text-text">
            My Wishlist
          </h1>
          <p className="font-sans text-text-muted mt-2">
            {totalWishlist} {totalWishlist === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <button
            onClick={clearWishlist}
            className="font-sans text-sm text-text-muted 
                       hover:text-red-500 transition-colors duration-normal
                       flex items-center gap-2"
          >
            <FaTrash size={12} />
            Clear Wishlist
          </button>
        )}
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 
                     bg-transparent text-text border border-text 
                     px-8 py-4 rounded-lg font-sans text-sm uppercase 
                     tracking-wider hover:bg-text hover:text-white 
                     transition-all duration-normal"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default Wishlist
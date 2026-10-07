// src/components/ProductCard.jsx
import { FaHeart, FaShoppingBag, FaStar } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

function ProductCard({ product }) {
    const {
        name, price, oldPrice, category, image,
        description, badge, rating, reviews, inStock
    } = product

    const { addToCart } = useCart()
    const { toggleWishlist, isInWishlist } = useWishlist()

    const isWishlisted = isInWishlist(product.id)
    const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0

    const handleAddToCart = (e) => {
        e.stopPropagation()
        if (inStock) addToCart(product)
    }

    const handleWishlist = (e) => {
        e.stopPropagation()
        toggleWishlist(product)
    }

    return (
        <div className="group rounded-xl bg-surface shadow-card border border-border 
                    hover:shadow-lg transition-all duration-normal ease-smooth 
                    overflow-hidden flex flex-col">

            {/* Image Section */}
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-72 object-cover transition-transform duration-slow 
                     ease-luxury group-hover:scale-110"
                />

                {/* Badge */}
                {badge && (
                    <span className={`absolute top-3 left-3 text-white text-xs px-3 py-1 
                            rounded-full font-sans uppercase tracking-wider
                            ${badge === 'Sale' ? 'bg-red-500' :
                            badge === 'New Arrival' ? 'bg-primary-500' :
                                'bg-accent-900'}`}>
                        {badge}
                    </span>
                )}

                {/* Discount */}
                {discount > 0 && (
                    <span className="absolute top-3 right-3 bg-accent-900 text-white 
                           text-xs px-2 py-1 rounded-full font-sans font-bold">
                        -{discount}%
                    </span>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className={`absolute bottom-3 right-3 p-2 rounded-full 
                      transition-all duration-fast
                      ${isWishlisted
                            ? 'bg-primary-500 text-white'
                            : 'bg-white/90 backdrop-blur-sm text-text hover:bg-primary-500 hover:text-white'}`}
                    aria-label="Wishlist"
                >
                    <FaHeart size={16} className={isWishlisted ? 'fill-current' : ''} />
                </button>

                {/* Out of Stock */}
                {!inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-white text-text font-sans text-sm px-4 py-2 
                             rounded-full uppercase tracking-wider">
                            Out of Stock
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">

                <div className="flex items-center justify-between mb-2">
                    <p className="font-sans text-xs uppercase tracking-widest text-primary-500">
                        {category}
                    </p>
                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" size={12} />
                        <span className="font-sans text-xs text-text-muted">
                            {rating} ({reviews})
                        </span>
                    </div>
                </div>

                <h3 className="font-serif text-xl text-text mb-2 group-hover:text-primary-600 
                       transition-colors duration-normal">
                    {name}
                </h3>

                <p className="font-sans text-sm text-text-muted leading-relaxed mb-4 flex-1">
                    {description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 
                        border-t border-border">
                    <div className="flex flex-col">
                        <span className="font-serif text-xl text-primary-600 font-bold">
                            ${price}
                        </span>
                        {oldPrice && (
                            <span className="font-sans text-xs text-text-muted line-through">
                                ${oldPrice}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md 
                        font-sans text-sm transition-colors duration-normal
                        ${inStock
                                ? 'bg-primary-500 text-white hover:bg-primary-600'
                                : 'bg-border text-text-muted cursor-not-allowed'}`}
                    >
                        <FaShoppingBag size={14} />
                        {inStock ? 'Add to Cart' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
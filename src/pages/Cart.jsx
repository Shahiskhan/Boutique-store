// src/pages/Cart.jsx
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingBag } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Cart() {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice
    } = useCart()

    const navigate = useNavigate()
    const { isLoggedIn } = useAuth()

    // Proceed to checkout
    const handleCheckout = () => {
        if (isLoggedIn) {
            navigate('/checkout')
        } else {
            navigate('/login')
        }
    }

    // Empty cart
    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
                <div className="text-center max-w-md mx-auto">
                    <div className="w-24 h-24 bg-primary-100 rounded-full 
                          flex items-center justify-center mx-auto mb-6">
                        <FaShoppingBag className="text-primary-600" size={36} />
                    </div>
                    <h1 className="font-serif text-4xl text-text mb-4">
                        Your Cart is Empty
                    </h1>
                    <p className="font-sans text-text-muted mb-8">
                        Looks like you haven't added anything yet. Start shopping to fill it up!
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 
                       bg-primary-500 text-white px-8 py-4 rounded-lg 
                       font-sans text-sm uppercase tracking-wider 
                       hover:bg-primary-600 transition-colors duration-normal"
                    >
                        Start Shopping
                    </Link>
                </div>
            </div>
        )
    }

    const shipping = totalPrice > 100 ? 0 : 10
    const tax = totalPrice * 0.05
    const finalTotal = totalPrice + shipping + tax

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

            {/* Header */}
            <div className="mb-10">
                <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 font-sans text-sm 
                     text-text-muted hover:text-primary-600 
                     transition-colors duration-normal mb-4"
                >
                    <FaArrowLeft size={12} />
                    Continue Shopping
                </Link>
                <h1 className="font-serif text-5xl text-text">
                    Shopping Cart
                </h1>
                <p className="font-sans text-text-muted mt-2">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-surface rounded-xl border border-border 
                         p-4 flex gap-4 shadow-soft"
                        >
                            {/* Image */}
                            <Link
                                to="/shop"
                                className="w-24 h-24 lg:w-32 lg:h-32 rounded-lg overflow-hidden 
                           shrink-0 bg-secondary-100"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </Link>

                            {/* Info */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <p className="font-sans text-xs uppercase tracking-widest 
                                  text-primary-500 mb-1">
                                            {item.category}
                                        </p>
                                        <h3 className="font-serif text-lg text-text mb-1">
                                            {item.name}
                                        </h3>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-text-muted hover:text-red-500 
                               transition-colors duration-fast p-1"
                                        aria-label="Remove"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    {/* Quantity */}
                                    <div className="flex items-center border border-border rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1.5 hover:bg-secondary-100 
                                 transition-colors duration-fast"
                                            aria-label="Decrease"
                                        >
                                            <FaMinus size={10} />
                                        </button>
                                        <span className="px-4 py-1.5 font-sans text-sm 
                                     border-x border-border min-w-[40px] 
                                     text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1.5 hover:bg-secondary-100 
                                 transition-colors duration-fast"
                                            aria-label="Increase"
                                        >
                                            <FaPlus size={10} />
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <p className="font-serif text-lg text-primary-600 font-bold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <p className="font-sans text-xs text-text-muted">
                                            ${item.price} each
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-surface rounded-xl border border-border 
                          p-6 shadow-card sticky top-24">
                        <h2 className="font-serif text-2xl text-text mb-6">
                            Order Summary
                        </h2>

                        <div className="space-y-3 mb-6 pb-6 border-b border-border">
                            <div className="flex justify-between font-sans text-sm">
                                <span className="text-text-muted">Subtotal</span>
                                <span className="text-text">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-sans text-sm">
                                <span className="text-text-muted">Shipping</span>
                                <span className="text-text">
                                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="flex justify-between font-sans text-sm">
                                <span className="text-text-muted">Tax (5%)</span>
                                <span className="text-text">${tax.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="font-serif text-lg text-text">Total</span>
                            <span className="font-serif text-2xl text-primary-600 font-bold">
                                ${finalTotal.toFixed(2)}
                            </span>
                        </div>

                        {shipping > 0 && (
                            <p className="font-sans text-xs text-text-muted mb-4 
                            bg-secondary-100 p-3 rounded-lg text-center">
                                Add ${(100 - totalPrice).toFixed(2)} more for free shipping!
                            </p>
                        )}

                        {/* Proceed to Checkout */}
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-primary-500 text-white py-3 rounded-lg 
                         font-sans text-sm uppercase tracking-wider 
                         hover:bg-primary-600 transition-colors duration-normal
                         mb-3"
                        >
                            Proceed to Checkout
                        </button>

                        {/* Login hint */}
                        {!isLoggedIn && (
                            <p className="font-sans text-xs text-text-muted text-center mb-3">
                                <Link to="/login" className="text-primary-600 underline">
                                    Login
                                </Link>{' '}
                                for faster checkout
                            </p>
                        )}

                        <Link
                            to="/shop"
                            className="block text-center font-sans text-sm text-text-muted 
                         hover:text-primary-600 transition-colors duration-normal"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
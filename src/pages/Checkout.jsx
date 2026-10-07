// src/pages/Checkout.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaTruck, FaCreditCard, FaMoneyBillWave,
    FaCheck, FaArrowLeft, FaMapMarkerAlt, FaPhone, FaUser, FaGift
} from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'

function Checkout() {
    const { cartItems, totalPrice, clearCart } = useCart()
    const { user, isLoggedIn, canGetWelcomeCoupon, useCoupon } = useAuth()
    const { placeOrder } = useOrders()
    const navigate = useNavigate()

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'cod',
        cardNumber: '',
        cardExpiry: '',
        cardCVV: ''
    })

    const [errors, setErrors] = useState({})
    const [isPlacing, setIsPlacing] = useState(false)
    const [couponApplied, setCouponApplied] = useState(false)

    // Calculations
    const subtotal = totalPrice
    const shipping = subtotal > 100 ? 0 : 10
    const tax = subtotal * 0.05
    const couponDiscount = couponApplied ? subtotal * 0.10 : 0
    const total = subtotal + shipping + tax - couponDiscount

    // Handle input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' })
        }
    }

    // Coupon apply
    const handleApplyCoupon = () => {
        if (canGetWelcomeCoupon()) {
            setCouponApplied(true)
            useCoupon()
        }
    }

    // Validate
    const validate = () => {
        const newErrors = {}

        if (!formData.name.trim()) newErrors.name = 'Name required'
        if (!formData.email.trim()) newErrors.email = 'Email required'
        if (!formData.phone.trim()) newErrors.phone = 'Phone required'
        if (!formData.address.trim()) newErrors.address = 'Address required'
        if (!formData.city.trim()) newErrors.city = 'City required'

        if (formData.paymentMethod === 'online') {
            if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number required'
            if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry required'
            if (!formData.cardCVV.trim()) newErrors.cardCVV = 'CVV required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Place order
    const handlePlaceOrder = (e) => {
        e.preventDefault()

        if (!validate()) return

        setIsPlacing(true)

        // Fake API delay
        setTimeout(() => {
            // Order record karo
            const newOrder = placeOrder({
                items: cartItems.map((item) => ({
                    id: item.id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity,
                    category: item.category
                })),
                subtotal,
                shipping,
                tax,
                couponDiscount,
                total,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
                paymentMethod: formData.paymentMethod
            })

            // Cart clear karo
            clearCart()

            // Success page pe bhejo order ID ke saath
            navigate(`/order-success/${newOrder.id}`)
        }, 1500)
    }

    // Empty cart
    if (cartItems.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
                <h1 className="font-serif text-4xl text-text mb-4">
                    Your Cart is Empty
                </h1>
                <Link
                    to="/shop"
                    className="inline-flex items-center gap-3 bg-primary-500 text-white 
                     px-8 py-4 rounded-lg font-sans text-sm uppercase 
                     tracking-wider hover:bg-primary-600 transition-colors"
                >
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

            {/* Header */}
            <div className="mb-10">
                <Link
                    to="/cart"
                    className="inline-flex items-center gap-2 font-sans text-sm 
                     text-text-muted hover:text-primary-600 
                     transition-colors duration-normal mb-4"
                >
                    <FaArrowLeft size={12} />
                    Back to Cart
                </Link>
                <h1 className="font-serif text-5xl text-text">
                    Checkout
                </h1>
                <p className="font-sans text-text-muted mt-2">
                    {isLoggedIn
                        ? `Welcome back, ${user.name}!`
                        : 'Complete your details to place the order'}
                </p>
            </div>

            {/* Welcome Coupon Banner */}
            {canGetWelcomeCoupon() && !couponApplied && (
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 
                        rounded-xl p-5 mb-8 flex flex-col sm:flex-row 
                        items-center justify-between gap-4 text-white">
                    <div className="flex items-center gap-3">
                        <FaGift size={28} />
                        <div>
                            <p className="font-serif text-lg">Welcome Bonus!</p>
                            <p className="font-sans text-xs opacity-90">
                                Get 10% off your first order — limited time offer
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleApplyCoupon}
                        className="bg-white text-primary-600 px-5 py-2 rounded-lg 
                       font-sans text-sm uppercase tracking-wider 
                       hover:bg-secondary-100 transition-colors duration-normal
                       shrink-0"
                    >
                        Apply 10% Off
                    </button>
                </div>
            )}

            {couponApplied && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-8 
                        flex items-center gap-3">
                    <FaCheck className="text-green-600" size={20} />
                    <p className="font-sans text-sm text-green-700">
                        Coupon applied! You saved ${couponDiscount.toFixed(2)}
                    </p>
                </div>
            )}

            <form onSubmit={handlePlaceOrder}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left — Form */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Shipping Info */}
                        <div className="bg-surface rounded-xl border border-border 
                            shadow-soft p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-100 rounded-full 
                                flex items-center justify-center 
                                text-primary-600">
                                    <FaTruck size={18} />
                                </div>
                                <h2 className="font-serif text-2xl text-text">
                                    Shipping Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="sm:col-span-2">
                                    <label className="font-sans text-sm text-text mb-2 block">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 
                                       text-text-muted" size={14} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full bg-background border rounded-lg 
                                  pl-11 pr-4 py-3 font-sans text-sm text-text 
                                  focus:outline-none transition-colors duration-normal
                                  ${errors.name ? 'border-red-400' : 'border-border focus:border-primary-500'}`}
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="font-sans text-xs text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="font-sans text-sm text-text mb-2 block">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-background border rounded-lg 
                                px-4 py-3 font-sans text-sm text-text 
                                focus:outline-none transition-colors duration-normal
                                ${errors.email ? 'border-red-400' : 'border-border focus:border-primary-500'}`}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && (
                                        <p className="font-sans text-xs text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="font-sans text-sm text-text mb-2 block">
                                        Phone *
                                    </label>
                                    <div className="relative">
                                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 
                                        text-text-muted" size={12} />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`w-full bg-background border rounded-lg 
                                  pl-11 pr-4 py-3 font-sans text-sm text-text 
                                  focus:outline-none transition-colors duration-normal
                                  ${errors.phone ? 'border-red-400' : 'border-border focus:border-primary-500'}`}
                                            placeholder="+92 300 1234567"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="font-sans text-xs text-red-500 mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="sm:col-span-2">
                                    <label className="font-sans text-sm text-text mb-2 block">
                                        Street Address *
                                    </label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-4 top-4 
                                              text-text-muted" size={14} />
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={2}
                                            className={`w-full bg-background border rounded-lg 
                                  pl-11 pr-4 py-3 font-sans text-sm text-text 
                                  focus:outline-none transition-colors duration-normal
                                  resize-none
                                  ${errors.address ? 'border-red-400' : 'border-border focus:border-primary-500'}`}
                                            placeholder="House #, Street, Area"
                                        />
                                    </div>
                                    {errors.address && (
                                        <p className="font-sans text-xs text-red-500 mt-1">{errors.address}</p>
                                    )}
                                </div>

                                {/* City */}
                                <div>
                                    <label className="font-sans text-sm text-text mb-2 block">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        className={`w-full bg-background border rounded-lg 
                                px-4 py-3 font-sans text-sm text-text 
                                focus:outline-none transition-colors duration-normal
                                ${errors.city ? 'border-red-400' : 'border-border focus:border-primary-500'}`}
                                        placeholder="Lahore"
                                    />
                                    {errors.city && (
                                        <p className="font-sans text-xs text-red-500 mt-1">{errors.city}</p>
                                    )}
                                </div>

                                {/* Postal */}
                                <div>
                                    <label className="font-sans text-sm text-text mb-2 block">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="w-full bg-background border border-border rounded-lg 
                               px-4 py-3 font-sans text-sm text-text 
                               focus:outline-none focus:border-primary-500 
                               transition-colors duration-normal"
                                        placeholder="54000"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-surface rounded-xl border border-border 
                            shadow-soft p-6 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-primary-100 rounded-full 
                                flex items-center justify-center 
                                text-primary-600">
                                    <FaCreditCard size={18} />
                                </div>
                                <h2 className="font-serif text-2xl text-text">
                                    Payment Method
                                </h2>
                            </div>

                            <div className="space-y-3 mb-6">
                                {/* COD */}
                                <label className={`flex items-center gap-4 p-4 rounded-lg 
                                   border-2 cursor-pointer transition-all duration-normal
                                   ${formData.paymentMethod === 'cod'
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-border hover:border-primary-300'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-primary-500"
                                    />
                                    <FaMoneyBillWave className="text-primary-600" size={24} />
                                    <div>
                                        <p className="font-serif text-base text-text">
                                            Cash on Delivery
                                        </p>
                                        <p className="font-sans text-xs text-text-muted">
                                            Pay when your order arrives
                                        </p>
                                    </div>
                                </label>

                                {/* Online */}
                                <label className={`flex items-center gap-4 p-4 rounded-lg 
                                   border-2 cursor-pointer transition-all duration-normal
                                   ${formData.paymentMethod === 'online'
                                        ? 'border-primary-500 bg-primary-50'
                                        : 'border-border hover:border-primary-300'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="online"
                                        checked={formData.paymentMethod === 'online'}
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-primary-500"
                                    />
                                    <FaCreditCard className="text-primary-600" size={24} />
                                    <div>
                                        <p className="font-serif text-base text-text">
                                            Online Payment
                                        </p>
                                        <p className="font-sans text-xs text-text-muted">
                                            Credit / Debit card
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* Card Details */}
                            {formData.paymentMethod === 'online' && (
                                <div className="space-y-4 pt-6 border-t border-border">
                                    <div>
                                        <label className="font-sans text-sm text-text mb-2 block">
                                            Card Number *
                                        </label>
                                        <input
                                            type="text"
                                            name="cardNumber"
                                            value={formData.cardNumber}
                                            onChange={handleChange}
                                            placeholder="4242 4242 4242 4242"
                                            className={`w-full bg-background border rounded-lg 
                                  px-4 py-3 font-sans text-sm text-text 
                                  focus:outline-none transition-colors
                                  ${errors.cardNumber ? 'border-red-400' : 'border-border focus:border-primary-500'}`}
                                        />
                                        {errors.cardNumber && (
                                            <p className="font-sans text-xs text-red-500 mt-1">
                                                {errors.cardNumber}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="font-sans text-sm text-text mb-2 block">
                                                Expiry *
                                            </label>
                                            <input
                                                type="text"
                                                name="cardExpiry"
                                                value={formData.cardExpiry}
                                                onChange={handleChange}
                                                placeholder="MM/YY"
                                                className={`w-full bg-background border rounded-lg 
                                    px-4 py-3 font-sans text-sm text-text 
                                    focus:outline-none transition-colors
                                    ${errors.cardExpiry ? 'border-red-400' : 'border-border focus:border-primary-500'}`}
                                            />
                                            {errors.cardExpiry && (
                                                <p className="font-sans text-xs text-red-500 mt-1">
                                                    {errors.cardExpiry}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="font-sans text-sm text-text mb-2 block">
                                                CVV *
                                            </label>
                                            <input
                                                type="text"
                                                name="cardCVV"
                                                value={formData.cardCVV}
                                                onChange={handleChange}
                                                placeholder="123"
                                                maxLength={4}
                                                className={`w-full bg-background border rounded-lg 
                                    px-4 py-3 font-sans text-sm text-text 
                                    focus:outline-none transition-colors
                                    ${errors.cardCVV ? 'border-red-400' : 'border-border focus:border-primary-500'}`}
                                            />
                                            {errors.cardCVV && (
                                                <p className="font-sans text-xs text-red-500 mt-1">
                                                    {errors.cardCVV}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right — Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface rounded-xl border border-border 
                            shadow-card p-6 sticky top-24">
                            <h2 className="font-serif text-2xl text-text mb-6">
                                Order Summary
                            </h2>

                            {/* Items */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-border 
                              max-h-60 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden 
                                    bg-secondary-100 shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-sans text-sm text-text truncate">
                                                {item.name}
                                            </p>
                                            <p className="font-sans text-xs text-text-muted">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-sans text-sm text-text font-semibold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-3 mb-6 pb-6 border-b border-border">
                                <div className="flex justify-between font-sans text-sm">
                                    <span className="text-text-muted">Subtotal</span>
                                    <span className="text-text">${subtotal.toFixed(2)}</span>
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
                                {couponApplied && (
                                    <div className="flex justify-between font-sans text-sm">
                                        <span className="text-green-600">Coupon (10%)</span>
                                        <span className="text-green-600">
                                            -${couponDiscount.toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-serif text-lg text-text">Total</span>
                                <span className="font-serif text-2xl text-primary-600 font-bold">
                                    ${total.toFixed(2)}
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={isPlacing}
                                className="w-full bg-primary-500 text-white py-4 rounded-lg 
                           font-sans text-sm uppercase tracking-wider 
                           hover:bg-primary-600 transition-colors duration-normal
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                            >
                                {isPlacing ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 
                                    border-t-white rounded-full animate-spin" />
                                        Placing Order...
                                    </>
                                ) : (
                                    <>Place Order • ${total.toFixed(2)}</>
                                )}
                            </button>

                            {!isLoggedIn && (
                                <p className="font-sans text-xs text-text-muted text-center mt-4">
                                    <Link to="/login" className="text-primary-600 underline">
                                        Login
                                    </Link>{' '}
                                    to save this order for next time
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Checkout
// src/pages/OrderDetail.jsx
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import {
    FaArrowLeft, FaBox, FaTruck, FaCheckCircle, FaClock,
    FaTimesCircle, FaMapMarkerAlt, FaPhone, FaEnvelope,
    FaCreditCard, FaMoneyBillWave, FaTrash
} from 'react-icons/fa'
import { useOrders, ORDER_STATUS } from '../context/OrderContext'

function OrderDetail() {
    const { orderId } = useParams()
    const navigate = useNavigate()
    const { getOrder, cancelOrder } = useOrders()

    const order = getOrder(orderId)

    if (!order) {
        return <Navigate to="/orders" replace />
    }

    // Timeline steps
    const timelineSteps = [
        { status: ORDER_STATUS.PENDING, label: 'Order Placed', icon: <FaClock size={14} /> },
        { status: ORDER_STATUS.PROCESSING, label: 'Processing', icon: <FaBox size={14} /> },
        { status: ORDER_STATUS.SHIPPED, label: 'Shipped', icon: <FaTruck size={14} /> },
        { status: ORDER_STATUS.DELIVERED, label: 'Delivered', icon: <FaCheckCircle size={14} /> }
    ]

    // Current step index
    const currentStepIndex = timelineSteps.findIndex(
        (step) => step.status === order.status
    )

    // Cancel handler
    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            cancelOrder(order.id)
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16">

            {/* Header */}
            <div className="mb-10">
                <Link
                    to="/orders"
                    className="inline-flex items-center gap-2 font-sans text-sm 
                     text-text-muted hover:text-primary-600 
                     transition-colors duration-normal mb-4"
                >
                    <FaArrowLeft size={12} />
                    Back to Orders
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center 
                        justify-between gap-4">
                    <div>
                        <h1 className="font-serif text-4xl text-text mb-2">
                            Order Details
                        </h1>
                        <p className="font-sans text-sm text-text-muted">
                            Order ID: <strong className="text-text">{order.id}</strong>
                        </p>
                    </div>

                    {order.status === ORDER_STATUS.PENDING && (
                        <button
                            onClick={handleCancel}
                            className="inline-flex items-center gap-2 
                         bg-red-50 text-red-600 border border-red-200 
                         px-4 py-2 rounded-lg font-sans text-xs uppercase 
                         tracking-wider hover:bg-red-100 
                         transition-colors duration-normal"
                        >
                            <FaTrash size={12} />
                            Cancel Order
                        </button>
                    )}
                </div>
            </div>

            {/* Status Timeline */}
            {order.status !== ORDER_STATUS.CANCELLED ? (
                <div className="bg-surface rounded-xl border border-border 
                        shadow-soft p-6 lg:p-8 mb-8">
                    <h2 className="font-serif text-2xl text-text mb-8">
                        Order Tracking
                    </h2>

                    {/* Progress Steps */}
                    <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-1 bg-border" />
                        <div
                            className="absolute top-5 left-0 h-1 bg-primary-500 
                         transition-all duration-500"
                            style={{
                                width: `${(currentStepIndex / (timelineSteps.length - 1)) * 100}%`
                            }}
                        />

                        {/* Steps */}
                        <div className="relative grid grid-cols-4 gap-2">
                            {timelineSteps.map((step, index) => {
                                const isCompleted = index <= currentStepIndex
                                const isCurrent = index === currentStepIndex

                                return (
                                    <div key={step.status} className="flex flex-col items-center text-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center 
                                  justify-center transition-all duration-300
                                  ${isCompleted
                                                    ? 'bg-primary-500 text-white'
                                                    : 'bg-surface border-2 border-border text-text-muted'}
                                  ${isCurrent ? 'ring-4 ring-primary-100 scale-110' : ''}`}
                                        >
                                            {step.icon}
                                        </div>
                                        <p className={`font-sans text-xs mt-3 uppercase tracking-wider
                                  ${isCompleted ? 'text-text font-semibold' : 'text-text-muted'}`}>
                                            {step.label}
                                        </p>
                                        {isCurrent && (
                                            <p className="font-sans text-xs text-primary-600 mt-1">
                                                Current
                                            </p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Estimated Delivery */}
                    {order.status !== ORDER_STATUS.DELIVERED && (
                        <div className="mt-8 pt-6 border-t border-border 
                            flex items-center gap-3">
                            <FaTruck className="text-primary-500" size={20} />
                            <div>
                                <p className="font-serif text-base text-text">
                                    Estimated Delivery
                                </p>
                                <p className="font-sans text-sm text-text-muted">
                                    {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-red-50 border border-red-200 rounded-xl 
                        p-6 mb-8 flex items-center gap-3">
                    <FaTimesCircle className="text-red-600" size={24} />
                    <div>
                        <p className="font-serif text-lg text-red-700">
                            Order Cancelled
                        </p>
                        <p className="font-sans text-sm text-red-600">
                            This order has been cancelled.
                        </p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left — Items */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Items */}
                    <div className="bg-surface rounded-xl border border-border 
                          shadow-soft p-6">
                        <h2 className="font-serif text-xl text-text mb-6">
                            Items ({order.items.length})
                        </h2>

                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 
                                             pb-4 border-b border-border 
                                             last:border-0 last:pb-0">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden 
                                  bg-secondary-100 shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-sans text-xs uppercase tracking-widest 
                                  text-primary-500 mb-1">
                                            {item.category}
                                        </p>
                                        <p className="font-serif text-base text-text truncate">
                                            {item.name}
                                        </p>
                                        <p className="font-sans text-xs text-text-muted">
                                            Qty: {item.quantity} × ${item.price}
                                        </p>
                                    </div>
                                    <p className="font-serif text-lg text-primary-600 font-bold">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-surface rounded-xl border border-border 
                          shadow-soft p-6">
                        <h2 className="font-serif text-xl text-text mb-6">
                            Shipping Address
                        </h2>

                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary-500 mt-1 shrink-0" size={14} />
                                <div>
                                    <p className="font-sans text-sm text-text font-semibold">
                                        {order.name}
                                    </p>
                                    <p className="font-sans text-sm text-text-muted">
                                        {order.address}, {order.city}
                                        {order.postalCode && ` - ${order.postalCode}`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhone className="text-primary-500 shrink-0" size={12} />
                                <p className="font-sans text-sm text-text-muted">
                                    {order.phone}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-primary-500 shrink-0" size={14} />
                                <p className="font-sans text-sm text-text-muted">
                                    {order.email}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right — Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-surface rounded-xl border border-border 
                          shadow-card p-6 sticky top-24">

                        <h2 className="font-serif text-xl text-text mb-6">
                            Order Summary
                        </h2>

                        {/* Payment Method */}
                        <div className="flex items-center gap-3 mb-6 pb-6 
                            border-b border-border">
                            {order.paymentMethod === 'cod' ? (
                                <FaMoneyBillWave className="text-primary-500" size={20} />
                            ) : (
                                <FaCreditCard className="text-primary-500" size={20} />
                            )}
                            <div>
                                <p className="font-sans text-xs uppercase tracking-widest 
                              text-text-muted">
                                    Payment
                                </p>
                                <p className="font-sans text-sm text-text">
                                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                </p>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="space-y-3 mb-6 pb-6 border-b border-border">
                            <div className="flex justify-between font-sans text-sm">
                                <span className="text-text-muted">Subtotal</span>
                                <span className="text-text">${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-sans text-sm">
                                <span className="text-text-muted">Shipping</span>
                                <span className="text-text">
                                    {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="flex justify-between font-sans text-sm">
                                <span className="text-text-muted">Tax</span>
                                <span className="text-text">${order.tax.toFixed(2)}</span>
                            </div>
                            {order.couponDiscount > 0 && (
                                <div className="flex justify-between font-sans text-sm">
                                    <span className="text-green-600">Coupon</span>
                                    <span className="text-green-600">
                                        -${order.couponDiscount.toFixed(2)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="font-serif text-lg text-text">Total</span>
                            <span className="font-serif text-2xl text-primary-600 font-bold">
                                ${order.total.toFixed(2)}
                            </span>
                        </div>

                        {/* Timeline */}
                        <div className="mt-6 pt-6 border-t border-border">
                            <p className="font-sans text-xs uppercase tracking-widest 
                            text-text-muted mb-3">
                                Activity
                            </p>
                            <div className="space-y-3">
                                {order.timeline.slice().reverse().map((event, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 
                                     shrink-0" />
                                        <div>
                                            <p className="font-sans text-xs text-text">
                                                {event.note}
                                            </p>
                                            <p className="font-sans text-xs text-text-muted">
                                                {new Date(event.date).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
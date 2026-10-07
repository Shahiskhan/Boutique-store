// src/pages/OrderSuccess.jsx
import { Link, useParams, Navigate } from 'react-router-dom'
import { FaCheck, FaHome, FaBoxOpen, FaTruck, FaEye } from 'react-icons/fa'
import { useOrders } from '../context/OrderContext'

function OrderSuccess() {
    const { orderId } = useParams()
    const { getOrder } = useOrders()
    const order = getOrder(orderId)

    if (!order) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6 py-16">
            <div className="max-w-2xl w-full text-center">

                <div className="w-24 h-24 bg-green-100 rounded-full 
                        flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="text-green-600" size={40} />
                </div>

                <h1 className="font-serif text-5xl text-text mb-4">
                    Order Placed!
                </h1>

                <p className="font-sans text-lg text-text-muted mb-8">
                    Thank you, {order.name}! Your order has been confirmed.
                </p>

                <div className="bg-surface rounded-2xl border border-border 
                        shadow-card p-8 mb-8 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="font-sans text-xs uppercase tracking-widest 
                            text-text-muted mb-1">
                                Order ID
                            </p>
                            <p className="font-serif text-lg text-text">
                                {order.id}
                            </p>
                        </div>

                        <div>
                            <p className="font-sans text-xs uppercase tracking-widest 
                            text-text-muted mb-1">
                                Total Paid
                            </p>
                            <p className="font-serif text-lg text-primary-600 font-bold">
                                ${order.total.toFixed(2)}
                            </p>
                        </div>

                        <div>
                            <p className="font-sans text-xs uppercase tracking-widest 
                            text-text-muted mb-1">
                                Payment Method
                            </p>
                            <p className="font-serif text-lg text-text">
                                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                            </p>
                        </div>

                        <div>
                            <p className="font-sans text-xs uppercase tracking-widest 
                            text-text-muted mb-1">
                                Status
                            </p>
                            <span className="inline-block bg-primary-100 text-primary-700 
                               text-xs px-3 py-1 rounded-full font-sans uppercase 
                               tracking-wider">
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border flex items-start gap-3">
                        <FaBoxOpen className="text-primary-500 mt-1 shrink-0" size={20} />
                        <div>
                            <p className="font-serif text-base text-text mb-1">
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
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to={`/orders/${order.id}`}
                        className="inline-flex items-center justify-center gap-3 
                       bg-primary-500 text-white px-6 py-3 rounded-lg 
                       font-sans text-sm uppercase tracking-wider 
                       hover:bg-primary-600 transition-colors"
                    >
                        <FaEye size={14} />
                        Track Order
                    </Link>

                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-3 
                       bg-transparent text-text border border-text 
                       px-6 py-3 rounded-lg font-sans text-sm uppercase 
                       tracking-wider hover:bg-text hover:text-white 
                       transition-all"
                    >
                        <FaHome size={14} />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
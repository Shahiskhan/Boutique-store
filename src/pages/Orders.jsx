// src/pages/Orders.jsx
import { Link } from 'react-router-dom'
import {
    FaBox, FaTruck, FaCheckCircle, FaClock,
    FaTimesCircle, FaEye, FaArrowLeft
} from 'react-icons/fa'
import { useOrders, ORDER_STATUS } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'

function Orders() {
    const { orders, getUserOrders } = useOrders()
    const { user, isLoggedIn } = useAuth()

    // Agar login hai toh sirf uske orders, warna saare (guest)
    const displayOrders = isLoggedIn && user
        ? getUserOrders(user.email)
        : orders

    // Status ke hisaab se icon aur color
    const getStatusStyle = (status) => {
        switch (status) {
            case ORDER_STATUS.PENDING:
                return {
                    icon: <FaClock size={14} />,
                    color: 'bg-yellow-100 text-yellow-700',
                    bar: 'bg-yellow-500'
                }
            case ORDER_STATUS.PROCESSING:
                return {
                    icon: <FaBox size={14} />,
                    color: 'bg-blue-100 text-blue-700',
                    bar: 'bg-blue-500'
                }
            case ORDER_STATUS.SHIPPED:
                return {
                    icon: <FaTruck size={14} />,
                    color: 'bg-purple-100 text-purple-700',
                    bar: 'bg-purple-500'
                }
            case ORDER_STATUS.DELIVERED:
                return {
                    icon: <FaCheckCircle size={14} />,
                    color: 'bg-green-100 text-green-700',
                    bar: 'bg-green-500'
                }
            case ORDER_STATUS.CANCELLED:
                return {
                    icon: <FaTimesCircle size={14} />,
                    color: 'bg-red-100 text-red-700',
                    bar: 'bg-red-500'
                }
            default:
                return {
                    icon: <FaClock size={14} />,
                    color: 'bg-secondary-100 text-text-muted',
                    bar: 'bg-border'
                }
        }
    }

    // Empty state
    if (displayOrders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
                <div className="text-center max-w-md mx-auto">
                    <div className="w-24 h-24 bg-primary-100 rounded-full 
                          flex items-center justify-center mx-auto mb-6">
                        <FaBox className="text-primary-600" size={36} />
                    </div>
                    <h1 className="font-serif text-4xl text-text mb-4">
                        No Orders Yet
                    </h1>
                    <p className="font-sans text-text-muted mb-8">
                        You haven't placed any orders. Start shopping to see them here!
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

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

            {/* Header */}
            <div className="mb-10">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 font-sans text-sm 
                     text-text-muted hover:text-primary-600 
                     transition-colors duration-normal mb-4"
                >
                    <FaArrowLeft size={12} />
                    Back to Home
                </Link>
                <h1 className="font-serif text-5xl text-text">
                    My Orders
                </h1>
                <p className="font-sans text-text-muted mt-2">
                    {displayOrders.length} {displayOrders.length === 1 ? 'order' : 'orders'} found
                </p>
            </div>

            {/* Orders List */}
            <div className="space-y-5">
                {displayOrders.map((order) => {
                    const style = getStatusStyle(order.status)

                    return (
                        <div
                            key={order.id}
                            className="bg-surface rounded-xl border border-border 
                         shadow-soft overflow-hidden"
                        >
                            {/* Status Bar */}
                            <div className={`h-1 ${style.bar}`} />

                            <div className="p-6">
                                {/* Top Row */}
                                <div className="flex flex-col sm:flex-row sm:items-center 
                                justify-between gap-4 mb-6 pb-6 
                                border-b border-border">
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
                                            Placed On
                                        </p>
                                        <p className="font-sans text-sm text-text">
                                            {new Date(order.placedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="font-sans text-xs uppercase tracking-widest 
                                  text-text-muted mb-1">
                                            Total
                                        </p>
                                        <p className="font-serif text-lg text-primary-600 font-bold">
                                            ${order.total.toFixed(2)}
                                        </p>
                                    </div>

                                    <div>
                                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 
                                      rounded-full font-sans text-xs uppercase 
                                      tracking-wider ${style.color}`}>
                                            {style.icon}
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Items Preview */}
                                <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
                                    {order.items.slice(0, 4).map((item) => (
                                        <div
                                            key={item.id}
                                            className="w-16 h-16 rounded-lg overflow-hidden 
                                 bg-secondary-100 shrink-0"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                    {order.items.length > 4 && (
                                        <div className="w-16 h-16 rounded-lg bg-secondary-100 
                                    flex items-center justify-center 
                                    shrink-0">
                                            <span className="font-sans text-xs text-text-muted">
                                                +{order.items.length - 4}
                                            </span>
                                        </div>
                                    )}
                                    <div className="ml-auto shrink-0">
                                        <p className="font-sans text-xs text-text-muted">
                                            {order.items.length}{' '}
                                            {order.items.length === 1 ? 'item' : 'items'}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="inline-flex items-center gap-2 
                               bg-primary-500 text-white px-4 py-2 rounded-lg 
                               font-sans text-xs uppercase tracking-wider 
                               hover:bg-primary-600 transition-colors"
                                    >
                                        <FaEye size={12} />
                                        View Details
                                    </Link>

                                    {order.status === ORDER_STATUS.PENDING && (
                                        <span className="font-sans text-xs text-text-muted">
                                            You can cancel this order
                                        </span>
                                    )}

                                    {order.status === ORDER_STATUS.DELIVERED && (
                                        <span className="font-sans text-xs text-green-600">
                                            Delivered on{' '}
                                            {new Date(order.timeline[order.timeline.length - 1].date)
                                                .toLocaleDateString()}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders
// src/context/OrderContext.jsx
import { createContext, useState, useEffect, useContext } from 'react'

const OrderContext = createContext()

// Order statuses
export const ORDER_STATUS = {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled'
}

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState(() => {
        const stored = localStorage.getItem('boutique-orders')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('boutique-orders', JSON.stringify(orders))
    }, [orders])

    // Naya order place karo
    const placeOrder = (orderData) => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            ...orderData,
            status: ORDER_STATUS.PENDING,
            placedAt: new Date().toISOString(),
            estimatedDelivery: new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
            timeline: [
                {
                    status: ORDER_STATUS.PENDING,
                    date: new Date().toISOString(),
                    note: 'Order placed successfully'
                }
            ]
        }

        setOrders((prev) => [newOrder, ...prev])
        return newOrder
    }

    // Order status update karo
    const updateOrderStatus = (orderId, newStatus, note = '') => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId
                    ? {
                        ...order,
                        status: newStatus,
                        timeline: [
                            ...order.timeline,
                            {
                                status: newStatus,
                                date: new Date().toISOString(),
                                note: note || `Order ${newStatus.toLowerCase()}`
                            }
                        ]
                    }
                    : order
            )
        )
    }

    // Order cancel karo
    const cancelOrder = (orderId) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId
                    ? {
                        ...order,
                        status: ORDER_STATUS.CANCELLED,
                        timeline: [
                            ...order.timeline,
                            {
                                status: ORDER_STATUS.CANCELLED,
                                date: new Date().toISOString(),
                                note: 'Order cancelled by customer'
                            }
                        ]
                    }
                    : order
            )
        )
    }

    // Ek order dhundo
    const getOrder = (orderId) => {
        return orders.find((order) => order.id === orderId)
    }

    // User ke orders
    const getUserOrders = (email) => {
        return orders.filter((order) => order.email === email)
    }

    return (
        <OrderContext.Provider
            value={{
                orders,
                placeOrder,
                updateOrderStatus,
                cancelOrder,
                getOrder,
                getUserOrders,
                totalOrders: orders.length
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export function useOrders() {
    const context = useContext(OrderContext)
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider')
    }
    return context
}
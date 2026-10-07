import { Link, useParams } from 'react-router-dom'
import { ORDER_STATUS, useOrders } from '../../context/OrderContext'

function OrderDetail() {
    const { orderId } = useParams()
    const { orders, updateOrderStatus } = useOrders()
    const order = orders.find((item) => item.id === orderId)

    if (!order) {
        return (
            <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
                <h2 className="font-serif text-2xl">Order not found</h2>
                <Link to="/admin/orders" className="mt-4 inline-block text-sm font-semibold text-amber-800 hover:underline">Back to orders</Link>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl">
            <Link to="/admin/orders" className="text-sm font-medium text-amber-800 hover:underline">← Back to orders</Link>
            <div className="mb-6 mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm text-stone-500">Order details</p>
                    <h2 className="mt-1 font-serif text-3xl">{order.id}</h2>
                </div>
                <label className="text-sm font-medium text-stone-700">
                    Update status
                    <select
                        value={order.status}
                        onChange={(event) => updateOrderStatus(order.id, event.target.value, 'Order status updated by admin')}
                        className="ml-3 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
                    >
                        {Object.values(ORDER_STATUS).map((status) => <option key={status}>{status}</option>)}
                    </select>
                </label>
            </div>
            <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
                <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-4 font-semibold">Items</h3>
                    <div className="divide-y divide-stone-100">
                        {(order.items || []).map((item, index) => (
                            <div key={`${item.id}-${index}`} className="flex items-center gap-4 py-4">
                                <img src={item.image} alt="" className="h-14 w-14 rounded-lg bg-stone-100 object-cover" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate font-medium">{item.name}</p>
                                    <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">${(Number(item.price) * Number(item.quantity || 1)).toFixed(2)}</p>
                            </div>
                        ))}
                        {!order.items?.length && <p className="py-6 text-sm text-stone-500">This order has no item details.</p>}
                    </div>
                    <div className="mt-3 space-y-2 border-t border-stone-100 pt-4 text-sm">
                        <div className="flex justify-between"><span className="text-stone-500">Subtotal</span><span>${Number(order.subtotal || 0).toFixed(2)}</span></div>
                        <div className="flex justify-between"><span className="text-stone-500">Shipping</span><span>${Number(order.shipping || 0).toFixed(2)}</span></div>
                        <div className="flex justify-between border-t border-stone-100 pt-3 font-semibold"><span>Total</span><span>${Number(order.total || 0).toFixed(2)}</span></div>
                    </div>
                </section>
                <aside className="space-y-5">
                    <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-4 font-semibold">Customer</h3>
                        <p className="font-medium">{order.name || 'Guest'}</p>
                        <p className="mt-1 text-sm text-stone-500">{order.email}</p>
                        <p className="mt-1 text-sm text-stone-500">{order.phone}</p>
                    </section>
                    <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 font-semibold">Delivery address</h3>
                        <p className="text-sm leading-6 text-stone-600">{order.address || 'No address provided'}{order.city ? `, ${order.city}` : ''}{order.postalCode ? ` ${order.postalCode}` : ''}</p>
                        <p className="mt-3 text-xs text-stone-500">Payment: {order.paymentMethod || 'Not specified'}</p>
                    </section>
                    <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-3 font-semibold">Status history</h3>
                        <div className="space-y-3">
                            {(order.timeline || []).map((event, index) => (
                                <div key={`${event.status}-${event.date}-${index}`} className="border-l-2 border-amber-300 pl-3">
                                    <p className="text-sm font-medium">{event.status}</p>
                                    <p className="text-xs text-stone-500">{event.date ? new Date(event.date).toLocaleString() : ''}</p>
                                    {event.note && <p className="mt-1 text-xs text-stone-600">{event.note}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    )
}

export default OrderDetail

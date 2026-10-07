import { Link } from 'react-router-dom'
import { useOrders } from '../../context/OrderContext'

function Orders() {
    const { orders } = useOrders()

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-7">
                <p className="text-sm text-stone-500">Fulfillment</p>
                <h2 className="mt-1 font-serif text-3xl">Orders <span className="font-sans text-base text-stone-400">({orders.length})</span></h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                            <tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Total</th><th className="px-5 py-3" /></tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-5 py-4 font-medium">{order.id}</td>
                                    <td className="px-5 py-4"><p>{order.name || 'Guest'}</p><p className="text-xs text-stone-500">{order.email}</p></td>
                                    <td className="px-5 py-4 text-stone-600">{order.placedAt ? new Date(order.placedAt).toLocaleDateString() : '—'}</td>
                                    <td className="px-5 py-4"><span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium">{order.status}</span></td>
                                    <td className="px-5 py-4 text-right">${Number(order.total || 0).toFixed(2)}</td>
                                    <td className="px-5 py-4 text-right"><Link to={`/admin/orders/${order.id}`} className="font-medium text-amber-800 hover:underline">View</Link></td>
                                </tr>
                            ))}
                            {!orders.length && <tr><td colSpan="6" className="px-5 py-12 text-center text-stone-500">No orders have been placed yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Orders

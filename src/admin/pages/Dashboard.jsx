import { Link } from 'react-router-dom'
import { FaBoxOpen, FaDollarSign, FaShoppingBag, FaTruck } from 'react-icons/fa'
import StatCard from '../components/StatCard'
import { useProducts } from '../../context/ProductContext'
import { ORDER_STATUS, useOrders } from '../../context/OrderContext'

function Dashboard() {
    const { products } = useProducts()
    const { orders } = useOrders()
    const pendingOrders = orders.filter((order) => order.status === ORDER_STATUS.PENDING).length
    const revenue = orders
        .filter((order) => order.status !== ORDER_STATUS.CANCELLED)
        .reduce((total, order) => total + Number(order.total || 0), 0)

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm text-stone-500">Overview</p>
                    <h2 className="mt-1 font-serif text-3xl">Dashboard</h2>
                </div>
                <p className="text-sm text-stone-500">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total products" value={products.length} detail="Products in your catalog" icon={FaBoxOpen} />
                <StatCard label="Total orders" value={orders.length} detail="All-time orders received" icon={FaShoppingBag} />
                <StatCard label="Pending orders" value={pendingOrders} detail="Require attention" icon={FaTruck} />
                <StatCard label="Revenue" value={`$${revenue.toFixed(2)}`} detail="Excludes cancelled orders" icon={FaDollarSign} />
            </div>
            <section className="mt-8 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-stone-100 px-5 py-4">
                    <h3 className="font-semibold">Recent orders</h3>
                    <Link to="/admin/orders" className="text-sm font-medium text-amber-800 hover:text-amber-950">View all</Link>
                </div>
                {orders.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[620px] text-left text-sm">
                            <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                                <tr><th className="px-5 py-3">Order</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Total</th></tr>
                            </thead>
                            <tbody className="divide-y divide-stone-100">
                                {orders.slice(0, 5).map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-5 py-4"><Link className="font-medium text-amber-800 hover:underline" to={`/admin/orders/${order.id}`}>{order.id}</Link></td>
                                        <td className="px-5 py-4">{order.name || order.email || 'Guest'}</td>
                                        <td className="px-5 py-4">{order.status}</td>
                                        <td className="px-5 py-4 text-right">${Number(order.total || 0).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="px-5 py-10 text-center text-sm text-stone-500">No orders have been placed yet.</p>}
            </section>
        </div>
    )
}

export default Dashboard

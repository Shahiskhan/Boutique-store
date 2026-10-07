import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { useProducts } from '../../context/ProductContext'

function Products() {
    const { products, deleteProduct } = useProducts()
    const [query, setQuery] = useState('')
    const visibleProducts = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        return products.filter((product) =>
            `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery)
        )
    }, [products, query])

    const handleDelete = (product) => {
        if (window.confirm(`Delete "${product.name}" from the catalog?`)) {
            deleteProduct(product.id)
        }
    }

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm text-stone-500">Catalog</p>
                    <h2 className="mt-1 font-serif text-3xl">Products <span className="font-sans text-base text-stone-400">({products.length})</span></h2>
                </div>
                <Link to="/admin/products/new" className="inline-flex items-center gap-2 rounded-lg bg-stone-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-stone-800">
                    <FaPlus size={12} /> Add product
                </Link>
            </div>
            <div className="mb-4 flex max-w-sm items-center gap-2 rounded-lg border border-stone-300 bg-white px-3">
                <FaSearch className="text-stone-400" size={14} />
                <input aria-label="Search products" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or category" className="w-full bg-transparent py-2.5 text-sm outline-none" />
            </div>
            <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="bg-stone-50 text-xs uppercase tracking-wide text-stone-500">
                            <tr><th className="px-5 py-3">Product</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">Price</th><th className="px-5 py-3">Inventory</th><th className="px-5 py-3 text-right">Actions</th></tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {visibleProducts.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <img src={product.image} alt="" className="h-11 w-11 rounded-lg bg-stone-100 object-cover" />
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-stone-600">{product.category}</td>
                                    <td className="px-5 py-3">${Number(product.price).toFixed(2)}</td>
                                    <td className="px-5 py-3">
                                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                            {product.inStock ? 'In stock' : 'Out of stock'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex justify-end gap-3">
                                            <Link to={`/admin/products/${product.id}/edit`} className="font-medium text-amber-800 hover:underline">Edit</Link>
                                            <button type="button" onClick={() => handleDelete(product)} aria-label={`Delete ${product.name}`} className="text-red-700 hover:text-red-900"><FaTrash size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!visibleProducts.length && <tr><td colSpan="5" className="px-5 py-12 text-center text-stone-500">No matching products found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Products

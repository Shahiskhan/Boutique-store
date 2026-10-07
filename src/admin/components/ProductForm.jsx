import { useState } from 'react'
import { productCategories } from '../../data/productCategories'

const defaultValues = {
    name: '',
    category: productCategories[0],
    price: '',
    oldPrice: '',
    image: '',
    description: '',
    badge: '',
    inStock: true
}

function ProductForm({ initialValues, onSubmit, submitLabel }) {
    const [values, setValues] = useState(() => ({
        ...defaultValues,
        ...initialValues,
        price: initialValues?.price ?? '',
        oldPrice: initialValues?.oldPrice ?? ''
    }))
    const [error, setError] = useState('')

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target
        setValues((currentValues) => ({
            ...currentValues,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setError('')

        const price = Number(values.price)
        const oldPrice = values.oldPrice === '' ? null : Number(values.oldPrice)
        if (!Number.isFinite(price) || price <= 0) {
            setError('Enter a valid price greater than zero.')
            return
        }
        if (oldPrice !== null && (!Number.isFinite(oldPrice) || oldPrice <= 0)) {
            setError('Enter a valid original price or leave it empty.')
            return
        }

        onSubmit({
            ...values,
            name: values.name.trim(),
            description: values.description.trim(),
            image: values.image.trim(),
            price,
            oldPrice,
            rating: Number(initialValues?.rating ?? 4.5),
            reviews: Number(initialValues?.reviews ?? 0)
        })
    }

    const inputClass = 'mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-100'
    const labelClass = 'block text-sm font-medium text-stone-700'

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
            <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                    Product name
                    <input className={inputClass} name="name" value={values.name} onChange={handleChange} required maxLength={100} />
                </label>
                <label className={labelClass}>
                    Category
                    <select className={inputClass} name="category" value={values.category} onChange={handleChange}>
                        {productCategories.map((category) => <option key={category}>{category}</option>)}
                    </select>
                </label>
                <label className={labelClass}>
                    Price
                    <input className={inputClass} type="number" name="price" value={values.price} onChange={handleChange} min="0.01" step="0.01" required />
                </label>
                <label className={labelClass}>
                    Original price (optional)
                    <input className={inputClass} type="number" name="oldPrice" value={values.oldPrice ?? ''} onChange={handleChange} min="0.01" step="0.01" />
                </label>
                <label className={labelClass}>
                    Image URL
                    <input className={inputClass} type="url" name="image" value={values.image} onChange={handleChange} placeholder="https://..." required />
                </label>
                <label className={labelClass}>
                    Badge
                    <select className={inputClass} name="badge" value={values.badge ?? ''} onChange={handleChange}>
                        <option value="">No badge</option>
                        <option>New Arrival</option>
                        <option>Sale</option>
                        <option>Bestseller</option>
                    </select>
                </label>
            </div>
            <label className={labelClass}>
                Description
                <textarea className={inputClass} name="description" value={values.description} onChange={handleChange} rows="4" maxLength={1000} required />
            </label>
            <label className="flex items-center gap-3 text-sm font-medium text-stone-700">
                <input type="checkbox" name="inStock" checked={Boolean(values.inStock)} onChange={handleChange} className="h-4 w-4 accent-amber-700" />
                In stock
            </label>
            <div className="flex flex-wrap gap-3 border-t border-stone-100 pt-5">
                <button type="submit" className="rounded-lg bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800">
                    {submitLabel}
                </button>
            </div>
        </form>
    )
}

export default ProductForm

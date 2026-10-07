import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '../components/ProductForm'
import { useProducts } from '../../context/ProductContext'

function AddProduct() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const { products, addProduct, updateProduct } = useProducts()
    const existingProduct = productId
        ? products.find((product) => String(product.id) === productId)
        : null

    if (productId && !existingProduct) {
        return (
            <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
                <h2 className="font-serif text-2xl">Product not found</h2>
                <button type="button" onClick={() => navigate('/admin/products')} className="mt-4 text-sm font-semibold text-amber-800 hover:underline">Back to products</button>
            </div>
        )
    }

    const handleSubmit = (productData) => {
        if (existingProduct) {
            updateProduct(existingProduct.id, productData)
        } else {
            addProduct(productData)
        }
        navigate('/admin/products')
    }

    return (
        <div className="mx-auto max-w-7xl">
            <div className="mb-7">
                <p className="text-sm text-stone-500">Catalog</p>
                <h2 className="mt-1 font-serif text-3xl">{existingProduct ? 'Edit product' : 'Add product'}</h2>
            </div>
            <ProductForm
                key={existingProduct?.id ?? 'new-product'}
                initialValues={existingProduct}
                onSubmit={handleSubmit}
                submitLabel={existingProduct ? 'Save changes' : 'Create product'}
            />
        </div>
    )
}

export default AddProduct

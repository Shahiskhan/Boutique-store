import { createContext, useContext, useEffect, useState } from 'react'
import { products as initialProducts } from '../data/products'
import { productCategories } from '../data/productCategories'

const ProductContext = createContext(null)

function readStoredProducts() {
    const stored = localStorage.getItem('boutique-products')
    return stored ? JSON.parse(stored) : initialProducts
}

export function ProductProvider({ children }) {
    const [products, setProducts] = useState(readStoredProducts)

    useEffect(() => {
        localStorage.setItem('boutique-products', JSON.stringify(products))
    }, [products])

    const addProduct = (productData) => {
        const id = products.reduce((highestId, product) => {
            const numericId = Number(product.id)
            return Number.isFinite(numericId) ? Math.max(highestId, numericId) : highestId
        }, 0) + 1
        const newProduct = { ...productData, id }
        setProducts((currentProducts) => [newProduct, ...currentProducts])
        return newProduct
    }

    const updateProduct = (productId, productData) => {
        setProducts((currentProducts) =>
            currentProducts.map((product) =>
                String(product.id) === String(productId)
                    ? { ...product, ...productData, id: product.id }
                    : product
            )
        )
    }

    const deleteProduct = (productId) => {
        setProducts((currentProducts) =>
            currentProducts.filter((product) => String(product.id) !== String(productId))
        )
    }

    const categories = ['All', ...productCategories]

    return (
        <ProductContext.Provider
            value={{ products, categories, addProduct, updateProduct, deleteProduct }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export function useProducts() {
    const context = useContext(ProductContext)
    if (!context) {
        throw new Error('useProducts must be used within ProductProvider')
    }
    return context
}

// src/components/ProductGrid.jsx
import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'

function ProductGrid({ products, itemsPerPage = 12 }) {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage)
  const [isLoading, setIsLoading] = useState(false)

  // Products change pe reset
  useEffect(() => {
    setVisibleCount(itemsPerPage)
  }, [products, itemsPerPage])

  const loadMore = () => {
    if (visibleCount >= products.length) return
    if (isLoading) return

    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + itemsPerPage, products.length))
      setIsLoading(false)
    }, 400)
  }

  const visibleProducts = products.slice(0, visibleCount)
  const hasMore = visibleCount < products.length

  if (products.length === 0) return null

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More / All Loaded */}
      <div className="flex flex-col items-center justify-center py-12 mt-8">

        {hasMore ? (
          <>
            {/* Progress Bar */}
            <div className="w-full max-w-md mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-sans text-xs text-text-muted">
                  Showing {visibleCount} of {products.length}
                </span>
                <span className="font-sans text-xs text-primary-600 font-bold">
                  {Math.round((visibleCount / products.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-500"
                  style={{ width: `${(visibleCount / products.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Load More Button */}
            <button
              onClick={loadMore}
              disabled={isLoading}
              className="bg-primary-500 text-white px-8 py-3 rounded-lg 
                         font-sans text-sm uppercase tracking-wider 
                         hover:bg-primary-600 transition-colors duration-normal
                         disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 
                                  border-t-white rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                <>Load More ({products.length - visibleCount} remaining)</>
              )}
            </button>
          </>
        ) : (
          <div className="inline-flex items-center gap-3 
                          bg-secondary-100 px-6 py-3 rounded-full">
            <span className="w-2 h-2 bg-primary-500 rounded-full" />
            <p className="font-sans text-sm text-text-muted">
              You've seen all {products.length} products
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductGrid
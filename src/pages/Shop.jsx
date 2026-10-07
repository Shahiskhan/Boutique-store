// src/pages/Shop.jsx
import { useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ProductGrid from '../components/ProductGrid'
import { useProducts } from '../context/ProductContext'

function Shop() {
    const { products, categories } = useProducts()
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('featured')

    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
        setSearchQuery('')
    }

    const clearSearch = () => setSearchQuery('')

    // Filter
    let filteredProducts = products.filter((product) => {
        const matchesCategory = selectedCategory === 'All'
            || product.category === selectedCategory

        const matchesSearch = searchQuery === ''
            || product.name.toLowerCase().includes(searchQuery.toLowerCase())
            || product.category.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesCategory && matchesSearch
    })

    // Sort
    if (sortBy === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
    }

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 w-full">

            {/* Header */}
            <div className="text-center mb-12">
                <p className="font-sans text-xs uppercase tracking-widest text-primary-500 mb-3">
                    Explore
                </p>
                <h1 className="font-serif text-5xl lg:text-6xl text-text mb-4">
                    {searchQuery ? `Results for "${searchQuery}"` : 'Shop Collection'}
                </h1>
                <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto">
                    {searchQuery
                        ? `Found ${filteredProducts.length} matching products`
                        : 'Discover timeless pieces crafted for the modern woman.'}
                </p>
            </div>

            {/* Search Indicator */}
            {searchQuery && (
                <div className="flex items-center justify-center gap-3 mb-8">
                    <span className="font-sans text-sm text-text-muted">
                        Searching for: <strong className="text-primary-600">"{searchQuery}"</strong>
                    </span>
                    <button
                        onClick={clearSearch}
                        className="font-sans text-xs uppercase tracking-wider 
                       text-primary-600 hover:text-primary-700 
                       underline transition-colors duration-normal"
                    >
                        Clear Search
                    </button>
                </div>
            )}

            {/* Category Filter */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />

            {/* Sort + Count Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between 
                      gap-4 mb-8 pb-6 border-b border-border">
                <p className="font-sans text-sm text-text-muted">
                    Showing <strong className="text-text">{filteredProducts.length}</strong> products
                </p>

                <div className="flex items-center gap-3">
                    <label className="font-sans text-sm text-text-muted">
                        Sort by:
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-surface border border-border rounded-lg px-4 py-2 
                       font-sans text-sm text-text 
                       focus:outline-none focus:border-primary-500 
                       cursor-pointer"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} itemsPerPage={12} />
            ) : (
                <div className="text-center py-20">
                    <p className="font-serif text-3xl text-text-muted mb-3">
                        No products found
                    </p>
                    <p className="font-sans text-sm text-text-muted mb-6">
                        Try a different search term or category.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery('')
                            setSelectedCategory('All')
                        }}
                        className="bg-primary-500 text-white px-6 py-3 rounded-lg 
                       font-sans text-sm uppercase tracking-wider 
                       hover:bg-primary-600 transition-colors duration-normal"
                    >
                        Reset Filters
                    </button>
                </div>
            )}
        </div>
    )
}

export default Shop
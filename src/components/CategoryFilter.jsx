// src/components/CategoryFilter.jsx
function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {categories.map((category) => {
                const isActive = selectedCategory === category

                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`relative font-sans text-sm uppercase tracking-wider 
                        px-5 py-2.5 rounded-full border transition-all duration-normal
                        ${isActive
                                ? 'bg-primary-500 text-white border-primary-500 shadow-soft'
                                : 'bg-surface text-text border-border hover:border-primary-500 hover:text-primary-600'
                            }`}
                    >
                        {category}

                        {/* Active ke liye chhota dot */}
                        {isActive && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent-900 
                               rounded-full" />
                        )}
                    </button>
                )
            })}
        </div>
    )
}

export default CategoryFilter
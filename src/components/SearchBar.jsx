// src/components/SearchBar.jsx
import { useState, useEffect, useRef } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'

function SearchBar({ isOpen, onClose, onSearch }) {
    const [query, setQuery] = useState('')
    const inputRef = useRef(null)

    // Jab search bar khule, input pe focus karo
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    // Escape key se band karo
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
        }
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query.trim())
            onClose()
        }
    }

    const handleClear = () => {
        setQuery('')
        inputRef.current?.focus()
    }

    if (!isOpen) return null

    return (
        <div className="pb-5 animate-in fade-in slide-in-from-top-2 duration-normal">
            <form onSubmit={handleSubmit} className="relative">
                {/* Search Icon */}
                <FaSearch
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
                    size={16}
                />

                {/* Input */}
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for products..."
                    className="w-full bg-background border border-border rounded-lg 
                     py-3 pl-12 pr-24 font-sans text-sm text-text 
                     placeholder:text-text-muted 
                     focus:outline-none focus:border-primary-500 
                     focus:ring-1 focus:ring-primary-500 
                     transition-all duration-normal"
                />

                {/* Clear Button (agar text hai) */}
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-20 top-1/2 -translate-y-1/2 
                       text-text-muted hover:text-primary-600 
                       transition-colors duration-fast"
                        aria-label="Clear"
                    >
                        <FaTimes size={14} />
                    </button>
                )}

                {/* Search Button */}
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 
                     bg-primary-500 text-white px-4 py-1.5 rounded-md 
                     font-sans text-xs uppercase tracking-wider 
                     hover:bg-primary-600 transition-colors duration-normal"
                >
                    Search
                </button>
            </form>

            {/* Quick Suggestions */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="font-sans text-xs text-text-muted">Popular:</span>
                {['Dresses', 'Bags', 'Scarves', 'Heels'].map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => {
                            setQuery(tag)
                            onSearch(tag)
                            onClose()
                        }}
                        className="font-sans text-xs text-text bg-surface border border-border 
                       px-3 py-1 rounded-full hover:border-primary-500 
                       hover:text-primary-600 transition-all duration-fast"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default SearchBar
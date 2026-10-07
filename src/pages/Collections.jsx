// src/pages/Collections.jsx
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

function Collections() {
    const collections = [
        {
            name: 'Summer Collection',
            description: 'Light, breezy pieces for warm days',
            image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
            count: 45,
            category: 'Clothing'
        },
        {
            name: 'Evening Elegance',
            description: 'Stunning dresses for special occasions',
            image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800',
            count: 32,
            category: 'Clothing'
        },
        {
            name: 'Leather Luxe',
            description: 'Premium handbags and accessories',
            image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
            count: 28,
            category: 'Bags'
        },
        {
            name: 'Golden Hour',
            description: 'Gold jewelry for every occasion',
            image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800',
            count: 36,
            category: 'Accessories'
        },
        {
            name: 'Street Style',
            description: 'Everyday footwear that makes a statement',
            image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800',
            count: 41,
            category: 'Footwear'
        },
        {
            name: 'Winter Warmth',
            description: 'Cozy pieces for the cold season',
            image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
            count: 24,
            category: 'Clothing'
        }
    ]

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">

            {/* Header */}
            <div className="text-center mb-16">
                <p className="font-sans text-xs uppercase tracking-widest text-primary-500 mb-3">
                    Curated for You
                </p>
                <h1 className="font-serif text-5xl lg:text-6xl text-text mb-6">
                    Our Collections
                </h1>
                <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto">
                    Explore our carefully curated collections, each telling its own
                    unique story of style and craftsmanship.
                </p>
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collections.map((collection) => (
                    <Link
                        key={collection.name}
                        to="/shop"
                        className="group relative rounded-2xl overflow-hidden 
                       shadow-card hover:shadow-lg 
                       transition-all duration-normal h-[450px]"
                    >
                        {/* Background Image */}
                        <img
                            src={collection.image}
                            alt={collection.name}
                            className="absolute inset-0 w-full h-full object-cover 
                         transition-transform duration-slow ease-luxury 
                         group-hover:scale-110"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t 
                            from-black/80 via-black/30 to-transparent" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <span className="font-sans text-xs uppercase tracking-widest 
                               text-primary-400 mb-2">
                                {collection.count} Items
                            </span>

                            <h3 className="font-serif text-3xl text-white mb-2">
                                {collection.name}
                            </h3>

                            <p className="font-sans text-sm text-white/80 mb-4">
                                {collection.description}
                            </p>

                            <div className="flex items-center gap-2 text-white 
                              group-hover:gap-3 transition-all duration-normal">
                                <span className="font-sans text-sm uppercase tracking-wider">
                                    Explore
                                </span>
                                <FaArrowRight size={12} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
                <Link
                    to="/shop"
                    className="group inline-flex items-center gap-3 
                     bg-primary-500 text-white px-8 py-4 rounded-lg 
                     font-sans text-sm uppercase tracking-wider 
                     hover:bg-primary-600 transition-all duration-normal"
                >
                    Shop All Products
                    <FaArrowRight size={14}
                        className="group-hover:translate-x-1 transition-transform duration-normal" />
                </Link>
            </div>
        </div>
    )
}

export default Collections
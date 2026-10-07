// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import { FaArrowRight, FaTruck, FaUndo, FaLock, FaHeadset } from 'react-icons/fa'
import HeroSection from '../components/HeroSection'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../context/ProductContext'

function Home() {
    const { products } = useProducts()
    // Featured products — pehle 8
    const featuredProducts = products.slice(0, 8)

    // Features
    const features = [
        {
            icon: <FaTruck size={24} />,
            title: 'Free Shipping',
            description: 'On orders above $100'
        },
        {
            icon: <FaUndo size={24} />,
            title: 'Easy Returns',
            description: '30-day return policy'
        },
        {
            icon: <FaLock size={24} />,
            title: 'Secure Payment',
            description: '100% secure checkout'
        },
        {
            icon: <FaHeadset size={24} />,
            title: '24/7 Support',
            description: 'Always here to help'
        }
    ]

    return (
        <div>
            {/* Hero Section */}
            <HeroSection />

            {/* Features Bar */}
            <section className="bg-surface border-y border-border">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-full 
                                flex items-center justify-center 
                                text-primary-600 shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <p className="font-serif text-sm text-text font-semibold">
                                        {feature.title}
                                    </p>
                                    <p className="font-sans text-xs text-text-muted">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
                <div className="text-center mb-12">
                    <p className="font-sans text-xs uppercase tracking-widest text-primary-500 mb-3">
                        Handpicked for you
                    </p>
                    <h2 className="font-serif text-5xl text-text mb-4">
                        Featured Products
                    </h2>
                    <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto">
                        Explore our most loved pieces, carefully selected for the season.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/shop"
                        className="group inline-flex items-center gap-3 
                       bg-primary-500 text-white px-8 py-4 rounded-lg 
                       font-sans text-sm uppercase tracking-wider 
                       hover:bg-primary-600 transition-all duration-normal"
                    >
                        View All Products
                        <FaArrowRight size={14}
                            className="group-hover:translate-x-1 transition-transform duration-normal" />
                    </Link>
                </div>
            </section>

            {/* Brand Story Banner */}
            <section className="bg-secondary-100 py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <div className="relative rounded-2xl overflow-hidden shadow-card 
                            h-[400px] lg:h-[500px]">
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                                alt="Boutique Store"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <p className="font-sans text-xs uppercase tracking-widest 
                            text-primary-500 mb-3">
                                Our Story
                            </p>
                            <h2 className="font-serif text-5xl text-text mb-6">
                                Crafted with Love,<br />
                                Worn with Pride
                            </h2>
                            <p className="font-sans text-text-muted leading-relaxed mb-6">
                                Since 2020, Elegance Boutique has been curating timeless pieces
                                for the modern woman. Every item in our collection is handpicked
                                for its quality, craftsmanship, and enduring style.
                            </p>
                            <p className="font-sans text-text-muted leading-relaxed mb-8">
                                We believe fashion should be timeless, not trendy. That's why we
                                focus on pieces that you'll love for years to come.
                            </p>

                            <Link
                                to="/about"
                                className="group inline-flex items-center gap-3 
                           text-primary-600 font-sans text-sm uppercase tracking-wider
                           hover:text-primary-700 transition-colors duration-normal"
                            >
                                Read Our Story
                                <FaArrowRight size={14}
                                    className="group-hover:translate-x-1 transition-transform duration-normal" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
                <div className="bg-text rounded-2xl p-10 lg:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] 
                          bg-primary-500 rounded-full opacity-20 blur-3xl" />

                    <div className="relative">
                        <h2 className="font-serif text-4xl lg:text-5xl text-white mb-4">
                            Get 10% Off Your First Order
                        </h2>
                        <p className="font-sans text-secondary-300 mb-8 max-w-xl mx-auto">
                            Subscribe to our newsletter for exclusive offers, new arrivals,
                            and style tips.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 bg-white/10 border border-white/20 rounded-lg 
                           px-5 py-3 font-sans text-sm text-white 
                           placeholder:text-secondary-400 
                           focus:outline-none focus:border-primary-500"
                            />
                            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg 
                                 font-sans text-sm uppercase tracking-wider 
                                 hover:bg-primary-600 transition-colors duration-normal">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
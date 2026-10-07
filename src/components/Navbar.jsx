// src/components/Navbar.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    FaShoppingBag, FaHeart, FaSearch, FaUser, FaBars, FaTimes,
    FaSignOutAlt, FaBox, FaChevronDown
} from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'
import SearchBar from './SearchBar'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

    const { totalItems } = useCart()
    const { totalWishlist } = useWishlist()
    const { user, isLoggedIn, logout } = useAuth()
    const { totalOrders } = useOrders()

    const navigate = useNavigate()

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/shop' },
        { name: 'Collections', path: '/collections' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]

    // Logout handler
    const handleLogout = () => {
        logout()
        setIsUserMenuOpen(false)
        setIsMenuOpen(false)
        navigate('/')
    }

    return (
        <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-md border-b border-border shadow-soft">
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-serif text-2xl lg:text-3xl font-bold text-primary-600 
                             group-hover:text-primary-700 transition-colors duration-normal">
                            Elegance
                        </span>
                        <span className="hidden sm:block font-sans text-xs uppercase tracking-widest 
                             text-text-muted mt-1">
                            Boutique
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative font-sans text-sm text-text 
                           hover:text-primary-600 transition-colors duration-normal
                           after:absolute after:bottom-[-4px] after:left-0 after:w-0 
                           after:h-[2px] after:bg-primary-500 after:transition-all 
                           after:duration-normal hover:after:w-full"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4 lg:gap-5">

                        {/* Search */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="text-text hover:text-primary-600 transition-colors duration-normal"
                            aria-label="Search"
                        >
                            <FaSearch size={18} />
                        </button>

                        {/* User Menu — Desktop */}
                        <div className="relative hidden sm:block">
                            {isLoggedIn ? (
                                <>
                                    {/* Logged in — Dropdown */}
                                    <button
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                        className="flex items-center gap-2 text-text 
                               hover:text-primary-600 transition-colors duration-normal"
                                        aria-label="Account"
                                    >
                                        <div className="w-7 h-7 bg-primary-500 rounded-full 
                                    flex items-center justify-center">
                                            <span className="font-serif text-xs text-white font-bold">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <FaChevronDown size={10} />
                                    </button>

                                    {/* Dropdown */}
                                    {isUserMenuOpen && (
                                        <>
                                            {/* Backdrop */}
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            />

                                            <div className="absolute right-0 top-full mt-3 w-56 
                                      bg-surface rounded-xl border border-border 
                                      shadow-card overflow-hidden z-50">
                                                {/* User Info */}
                                                <div className="p-4 border-b border-border">
                                                    <p className="font-serif text-sm text-text font-semibold truncate">
                                                        {user.name}
                                                    </p>
                                                    <p className="font-sans text-xs text-text-muted truncate">
                                                        {user.email}
                                                    </p>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="py-2">
                                                    <Link
                                                        to="/orders"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2.5 
                                       font-sans text-sm text-text 
                                       hover:bg-secondary-100 hover:text-primary-600 
                                       transition-colors duration-fast"
                                                    >
                                                        <FaBox size={14} />
                                                        My Orders
                                                        {totalOrders > 0 && (
                                                            <span className="ml-auto bg-primary-100 text-primary-700 
                                               text-[10px] px-2 py-0.5 rounded-full">
                                                                {totalOrders}
                                                            </span>
                                                        )}
                                                    </Link>

                                                    <Link
                                                        to="/wishlist"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2.5 
                                       font-sans text-sm text-text 
                                       hover:bg-secondary-100 hover:text-primary-600 
                                       transition-colors duration-fast"
                                                    >
                                                        <FaHeart size={14} />
                                                        My Wishlist
                                                    </Link>
                                                </div>

                                                {/* Logout */}
                                                <div className="border-t border-border py-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 
                                       font-sans text-sm text-red-600 
                                       hover:bg-red-50 
                                       transition-colors duration-fast text-left"
                                                    >
                                                        <FaSignOutAlt size={14} />
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                // Not logged in — Link to login
                                <Link
                                    to="/login"
                                    className="text-text hover:text-primary-600 
                             transition-colors duration-normal"
                                    aria-label="Login"
                                >
                                    <FaUser size={18} />
                                </Link>
                            )}
                        </div>

                        {/* Wishlist — with count */}
                        <Link
                            to="/wishlist"
                            className="relative text-text hover:text-primary-600 
                         transition-colors duration-normal"
                            aria-label="Wishlist"
                        >
                            <FaHeart size={18} />
                            {totalWishlist > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary-500 text-white 
                                 text-[10px] w-4 h-4 rounded-full flex items-center 
                                 justify-center font-sans">
                                    {totalWishlist}
                                </span>
                            )}
                        </Link>

                        {/* Cart — with count */}
                        <Link
                            to="/cart"
                            className="relative text-text hover:text-primary-600 
                         transition-colors duration-normal"
                            aria-label="Cart"
                        >
                            <FaShoppingBag size={18} />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent-900 text-white 
                                 text-[10px] w-4 h-4 rounded-full flex items-center 
                                 justify-center font-sans">
                                    {totalItems}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden text-text hover:text-primary-600 
                         transition-colors duration-normal"
                            aria-label="Menu"
                        >
                            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <SearchBar
                    isOpen={isSearchOpen}
                    onClose={() => setIsSearchOpen(false)}
                    onSearch={() => { }}
                />
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-surface border-t border-border">
                    <div className="px-6 py-4 flex flex-col gap-4">

                        {/* User Info — Mobile */}
                        {isLoggedIn && (
                            <div className="flex items-center gap-3 pb-4 border-b border-border">
                                <div className="w-10 h-10 bg-primary-500 rounded-full 
                                flex items-center justify-center">
                                    <span className="font-serif text-sm text-white font-bold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-serif text-sm text-text font-semibold truncate">
                                        {user.name}
                                    </p>
                                    <p className="font-sans text-xs text-text-muted truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Nav Links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="font-sans text-base text-text hover:text-primary-600 
                           transition-colors duration-normal py-2 
                           border-b border-border last:border-0"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* User Links */}
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/orders"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-sans text-base text-text hover:text-primary-600 
                             transition-colors duration-normal py-2 
                             border-b border-border flex items-center gap-3"
                                >
                                    <FaBox size={14} />
                                    My Orders ({totalOrders})
                                </Link>

                                <Link
                                    to="/wishlist"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-sans text-base text-text hover:text-primary-600 
                             transition-colors duration-normal py-2 
                             border-b border-border flex items-center gap-3"
                                >
                                    <FaHeart size={14} />
                                    Wishlist ({totalWishlist})
                                </Link>

                                <Link
                                    to="/cart"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-sans text-base text-text hover:text-primary-600 
                             transition-colors duration-normal py-2 
                             border-b border-border flex items-center gap-3"
                                >
                                    <FaShoppingBag size={14} />
                                    Cart ({totalItems})
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="font-sans text-base text-red-600 
                             transition-colors duration-normal py-2 
                             flex items-center gap-3 text-left"
                                >
                                    <FaSignOutAlt size={14} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/wishlist"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-sans text-base text-text hover:text-primary-600 
                             transition-colors duration-normal py-2 
                             border-b border-border flex items-center gap-3"
                                >
                                    <FaHeart size={14} />
                                    Wishlist ({totalWishlist})
                                </Link>

                                <Link
                                    to="/cart"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-sans text-base text-text hover:text-primary-600 
                             transition-colors duration-normal py-2 
                             border-b border-border flex items-center gap-3"
                                >
                                    <FaShoppingBag size={14} />
                                    Cart ({totalItems})
                                </Link>

                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="font-sans text-base text-primary-600 
                             transition-colors duration-normal py-2 
                             flex items-center gap-3 font-semibold"
                                >
                                    <FaUser size={14} />
                                    Login / Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar
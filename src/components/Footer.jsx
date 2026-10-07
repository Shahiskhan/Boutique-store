import { Link } from 'react-router-dom'
import {
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaPinterestP,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaPaperPlane
} from 'react-icons/fa'

function Footer() {
    const currentYear = new Date().getFullYear()

    const shopLinks = [
        { name: 'New Arrivals', path: '/shop' },
        { name: 'Clothing', path: '/shop' },
        { name: 'Accessories', path: '/shop' },
        { name: 'Bags', path: '/shop' },
        { name: 'Sale', path: '/shop' },
    ]

    const helpLinks = [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Shipping Info', path: '/shipping' },
        { name: 'Returns', path: '/returns' },
        { name: 'FAQs', path: '/faq' },
    ]

    const socialLinks = [
        { icon: <FaInstagram size={18} />, path: 'https://instagram.com', label: 'Instagram' },
        { icon: <FaFacebookF size={16} />, path: 'https://facebook.com', label: 'Facebook' },
        { icon: <FaTwitter size={18} />, path: 'https://twitter.com', label: 'Twitter' },
        { icon: <FaPinterestP size={18} />, path: 'https://pinterest.com', label: 'Pinterest' },
    ]

    return (
        <footer className="bg-text text-secondary-100 mt-20">

            {/* ===== Newsletter Section ===== */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                        {/* Left — Text */}
                        <div>
                            <h3 className="font-serif text-3xl mb-2">
                                Join Our Newsletter
                            </h3>
                            <p className="font-sans text-sm text-secondary-300">
                                Get exclusive offers, new arrivals, and style tips — straight to your inbox.
                            </p>
                        </div>

                        {/* Right — Input */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 
                                       text-text-muted" size={16} />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg 
                             py-3 pl-12 pr-4 font-sans text-sm text-white 
                             placeholder:text-secondary-400 
                             focus:outline-none focus:border-primary-500 
                             transition-all duration-normal"
                                />
                            </div>
                            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg 
                                 font-sans text-sm uppercase tracking-wider 
                                 hover:bg-primary-600 transition-colors duration-normal
                                 flex items-center justify-center gap-2">
                                <FaPaperPlane size={14} />
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== Main Footer ===== */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-4">
                            <span className="font-serif text-3xl font-bold text-primary-400">
                                Elegance
                            </span>
                            <span className="block font-sans text-xs uppercase tracking-widest 
                               text-secondary-400 mt-1">
                                Boutique
                            </span>
                        </Link>
                        <p className="font-sans text-sm text-secondary-300 leading-relaxed mb-5">
                            Timeless fashion for the modern woman. Crafted with love, delivered with care.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 
                             flex items-center justify-center 
                             hover:bg-primary-500 hover:border-primary-500 
                             hover:text-white transition-all duration-normal"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="font-serif text-lg text-primary-400 mb-5">
                            Shop
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {shopLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="font-sans text-sm text-secondary-300 
                               hover:text-primary-400 transition-colors duration-normal
                               inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-[1px] bg-primary-400 
                                     group-hover:w-4 transition-all duration-normal" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h4 className="font-serif text-lg text-primary-400 mb-5">
                            Help
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {helpLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="font-sans text-sm text-secondary-300 
                               hover:text-primary-400 transition-colors duration-normal
                               inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-[1px] bg-primary-400 
                                     group-hover:w-4 transition-all duration-normal" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-lg text-primary-400 mb-5">
                            Contact
                        </h4>
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-primary-400 mt-1 shrink-0" size={16} />
                                <span className="font-sans text-sm text-secondary-300 leading-relaxed">
                                    123 Fashion Street,<br />
                                    Lahore, Pakistan
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-primary-400 shrink-0" size={14} />
                                <a
                                    href="tel:+923001234567"
                                    className="font-sans text-sm text-secondary-300 
                             hover:text-primary-400 transition-colors duration-normal"
                                >
                                    +92 300 1234567
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-primary-400 shrink-0" size={16} />
                                <a
                                    href="mailto:hello@eleganceboutique.com"
                                    className="font-sans text-sm text-secondary-300 
                             hover:text-primary-400 transition-colors duration-normal"
                                >
                                    hello@eleganceboutique.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ===== Bottom Bar ===== */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                        <p className="font-sans text-xs text-secondary-400 text-center sm:text-left">
                            © {currentYear} Elegance Boutique. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6">
                            <Link
                                to="/privacy"
                                className="font-sans text-xs text-secondary-400 
                           hover:text-primary-400 transition-colors duration-normal"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="font-sans text-xs text-secondary-400 
                           hover:text-primary-400 transition-colors duration-normal"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
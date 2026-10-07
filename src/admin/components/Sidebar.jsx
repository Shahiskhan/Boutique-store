import { NavLink, useNavigate } from 'react-router-dom'
import { FaBoxOpen, FaChartLine, FaExternalLinkAlt, FaSignOutAlt, FaShoppingBag } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const navItems = [
    { label: 'Dashboard', to: '/admin', icon: FaChartLine, end: true },
    { label: 'Products', to: '/admin/products', icon: FaBoxOpen },
    { label: 'Orders', to: '/admin/orders', icon: FaShoppingBag }
]

function Sidebar() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login', { replace: true })
    }

    return (
        <aside className="w-full shrink-0 bg-stone-950 px-4 py-5 text-white lg:min-h-screen lg:w-64 lg:px-5">
            <NavLink to="/admin" className="mb-6 block px-3 font-serif text-2xl text-amber-300 lg:mb-10">
                Elegance <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-stone-400">Admin panel</span>
            </NavLink>
            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
                {navItems.map(({ label, to, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                isActive ? 'bg-amber-500 text-stone-950' : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                            }`
                        }
                    >
                        <Icon size={15} />
                        {label}
                    </NavLink>
                ))}
                <NavLink
                    to="/"
                    className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-stone-300 transition-colors hover:bg-stone-800 hover:text-white"
                >
                    <FaExternalLinkAlt size={13} />
                    View storefront
                </NavLink>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-stone-300 transition-colors hover:bg-stone-800 hover:text-white"
                >
                    <FaSignOutAlt size={15} />
                    Log out
                </button>
            </nav>
        </aside>
    )
}

export default Sidebar

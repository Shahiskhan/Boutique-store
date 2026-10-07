// src/pages/Login.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaGift, FaArrowRight } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        const result = login(email, password)

        if (result.success) {
            // Login ke baad checkout pe bhejo
            navigate(result.role === 'admin' ? '/admin' : '/checkout')
        } else {
            setError(result.error)
        }
    }

    // Demo fill
    const fillDemo = () => {
        setEmail('ayesha@example.com')
        setPassword('123456')
    }

    const fillAdminDemo = () => {
        setEmail('admin@boutique.com')
        setPassword('admin123')
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-md">

                {/* Welcome Coupon Banner */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 
                        rounded-xl p-4 mb-6 flex items-center gap-3 text-white">
                    <FaGift size={24} />
                    <div>
                        <p className="font-serif text-lg">Welcome Offer!</p>
                        <p className="font-sans text-xs opacity-90">
                            Login and get 10% off your first order
                        </p>
                    </div>
                </div>

                {/* Login Form */}
                <div className="bg-surface rounded-2xl shadow-card border border-border 
                        p-8">
                    <div className="text-center mb-8">
                        <h1 className="font-serif text-3xl text-text mb-2">
                            Welcome Back
                        </h1>
                        <p className="font-sans text-sm text-text-muted">
                            Login to continue with your order
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg 
                            p-3 mb-4">
                            <p className="font-sans text-sm text-red-600">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="font-sans text-sm text-text mb-2 block">
                                Email
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 
                                       text-text-muted" size={14} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-background border border-border rounded-lg 
                             pl-11 pr-4 py-3 font-sans text-sm text-text 
                             focus:outline-none focus:border-primary-500 
                             transition-colors duration-normal"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="font-sans text-sm text-text mb-2 block">
                                Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 
                                   text-text-muted" size={14} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-background border border-border rounded-lg 
                             pl-11 pr-4 py-3 font-sans text-sm text-text 
                             focus:outline-none focus:border-primary-500 
                             transition-colors duration-normal"
                                    placeholder="••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-500 text-white py-3 rounded-lg 
                         font-sans text-sm uppercase tracking-wider 
                         hover:bg-primary-600 transition-colors duration-normal
                         flex items-center justify-center gap-2"
                        >
                            Login & Continue
                            <FaArrowRight size={12} />
                        </button>
                    </form>

                    {/* Demo Login */}
                    <button
                        onClick={fillDemo}
                        className="w-full mt-3 text-center font-sans text-xs 
                       text-primary-600 hover:text-primary-700 
                       underline transition-colors duration-normal"
                    >
                        Use demo credentials
                    </button>
                    <button
                        onClick={fillAdminDemo}
                        className="w-full mt-2 text-center font-sans text-xs 
                       text-primary-600 hover:text-primary-700 
                       underline transition-colors duration-normal"
                    >
                        Use admin demo credentials
                    </button>

                    <div className="mt-6 pt-6 border-t border-border text-center">
                        <p className="font-sans text-sm text-text-muted">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-primary-600 hover:text-primary-700 
                           font-semibold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/* Continue as Guest */}
                    <div className="mt-4 text-center">
                        <Link
                            to="/checkout"
                            className="font-sans text-sm text-text-muted 
                         hover:text-primary-600 transition-colors duration-normal
                         underline"
                        >
                            Continue as Guest
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
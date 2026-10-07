// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()

// Fake users (baad mein backend se aayenge)
const fakeUsers = [
    {
        id: 1,
        name: 'Ayesha Khan',
        email: 'ayesha@example.com',
        password: '123456',
        phone: '+92 300 1234567',
        isFirstTime: true,
        role: 'customer'
    },
    {
        id: 2,
        name: 'Boutique Admin',
        email: 'admin@boutique.com',
        password: 'admin123',
        phone: '',
        isFirstTime: false,
        role: 'admin'
    }
]

function readStoredUser() {
    const stored = localStorage.getItem('boutique-user')
    if (!stored) return null

    const parsedUser = JSON.parse(stored)
    const safeUser = { ...parsedUser, role: parsedUser.role || 'customer' }
    delete safeUser.password
    return safeUser
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(readStoredUser)

    const [hasUsedCoupon, setHasUsedCoupon] = useState(() => {
        return localStorage.getItem('boutique-coupon-used') === 'true'
    })

    useEffect(() => {
        if (user) {
            localStorage.setItem('boutique-user', JSON.stringify(user))
        } else {
            localStorage.removeItem('boutique-user')
        }
    }, [user])

    useEffect(() => {
        localStorage.setItem('boutique-coupon-used', hasUsedCoupon)
    }, [hasUsedCoupon])

    // Login
    const login = (email, password) => {
        const foundUser = fakeUsers.find(
            (u) => u.email === email.trim().toLowerCase() && u.password === password
        )

        if (foundUser) {
            const safeUser = { ...foundUser }
            delete safeUser.password
            setUser(safeUser)
            return { success: true, role: safeUser.role }
        }

        return { success: false, error: 'Invalid email or password' }
    }

    // Register
    const register = (userData) => {
        const safeUserData = { ...userData }
        delete safeUserData.password
        const newUser = {
            id: Date.now(),
            ...safeUserData,
            isFirstTime: true,
            role: 'customer'
        }
        setUser(newUser)
        return { success: true }
    }

    // Logout
    const logout = () => {
        setUser(null)
    }

    // Coupon use karo
    const useCoupon = () => {
        setHasUsedCoupon(true)
    }

    // Welcome coupon milega?
    const canGetWelcomeCoupon = () => {
        return user && !hasUsedCoupon
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn: !!user,
                login,
                register,
                logout,
                hasUsedCoupon,
                useCoupon,
                canGetWelcomeCoupon
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function AdminRoute({ children }) {
    const { user, isLoggedIn } = useAuth()
    const location = useLocation()

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/" replace />
    }

    return children
}

export default AdminRoute
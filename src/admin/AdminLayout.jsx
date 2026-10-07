import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function AdminLayout() {
    return (
        <div className="min-h-screen bg-stone-100 text-stone-900 lg:flex">
            <Sidebar />
            <div className="min-w-0 flex-1">
                <header className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-4 sm:px-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                            Boutique store
                        </p>
                        <h1 className="mt-1 font-serif text-xl sm:text-2xl">Admin Dashboard</h1>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800">
                        Administrator
                    </span>
                </header>
                <main className="p-4 sm:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
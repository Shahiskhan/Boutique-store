// src/pages/NotFound.jsx
import { Link } from 'react-router-dom'
import { FaHome, FaArrowLeft } from 'react-icons/fa'

function NotFound() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
            <div className="text-center max-w-lg">

                <p className="font-serif text-[120px] lg:text-[180px] 
                      text-primary-500 leading-none font-bold">
                    404
                </p>

                <h1 className="font-serif text-4xl lg:text-5xl text-text mb-4">
                    Page Not Found
                </h1>

                <p className="font-sans text-text-muted leading-relaxed mb-8">
                    Oops! The page you're looking for doesn't exist. It might have been
                    moved or deleted.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-3 
                       bg-primary-500 text-white px-6 py-3 rounded-lg 
                       font-sans text-sm uppercase tracking-wider 
                       hover:bg-primary-600 transition-colors duration-normal"
                    >
                        <FaHome size={14} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-3 
                       bg-transparent text-text border border-text 
                       px-6 py-3 rounded-lg font-sans text-sm uppercase 
                       tracking-wider hover:bg-text hover:text-white 
                       transition-all duration-normal"
                    >
                        <FaArrowLeft size={14} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
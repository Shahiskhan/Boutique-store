// src/components/BackToTop.jsx
import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

function BackToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!isVisible) return null

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 
                 bg-primary-500 text-white rounded-full shadow-card 
                 flex items-center justify-center 
                 hover:bg-primary-600 transition-all duration-normal
                 hover:scale-110"
            aria-label="Back to top"
        >
            <FaArrowUp size={18} />
        </button>
    )
}

export default BackToTop
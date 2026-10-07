// src/components/HeroSection.jsx
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaStar, FaPlay, FaPause } from 'react-icons/fa'

// Video import
import heroVideo from '../assets/herovideo.mp4'

// Fallback images
const dressImages = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
        name: 'Silk Evening Dress'
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800',
        name: 'Pleated Midi Dress'
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
        name: 'Floral Summer Dress'
    }
]

function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVideoReady, setIsVideoReady] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const [hasUserInteracted, setHasUserInteracted] = useState(false)

    const videoRef = useRef(null)
    const autoPlayTimerRef = useRef(null)

    // Video load hone pe ready karo
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load()
        }
    }, [])

    // Auto-play timer: 5 second tak user click na kare toh video chalao
    useEffect(() => {
        // Agar video already playing hai, ya user ne interact kar liya, toh timer na lagao
        if (isVideoPlaying || hasUserInteracted) return

        // Purana timer clear karo
        if (autoPlayTimerRef.current) {
            clearTimeout(autoPlayTimerRef.current)
        }

        // Naya timer lagao — 5 second baad video play
        autoPlayTimerRef.current = setTimeout(() => {
            if (videoRef.current && isVideoReady) {
                videoRef.current.play()
                setIsVideoPlaying(true)
            }
        }, 5000)

        // Cleanup
        return () => {
            if (autoPlayTimerRef.current) {
                clearTimeout(autoPlayTimerRef.current)
            }
        }
    }, [isVideoReady, isVideoPlaying, hasUserInteracted])

    // Images ka auto-switch (jab video playing nahi ho)
    useEffect(() => {
        if (isVideoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % dressImages.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [isVideoPlaying])

    // Card click handler
    const handleCardClick = () => {
        setHasUserInteracted(true)

        // Agar video playing hai, toh pause karke images wapas
        if (isVideoPlaying) {
            if (videoRef.current) {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
            }
            setIsVideoPlaying(false)
            return
        }

        // Agar video ready hai aur user ne click kiya, toh video chalao
        if (isVideoReady && videoRef.current) {
            videoRef.current.play()
            setIsVideoPlaying(true)
            return
        }

        // Warna agli image dikhao
        setCurrentIndex((prev) => (prev + 1) % dressImages.length)
    }

    // Video ready hone pe
    const handleVideoReady = () => {
        setIsVideoReady(true)
    }

    return (
        <section className="relative bg-secondary-100 overflow-hidden">
            {/* Background circles */}
            <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] 
                      bg-primary-200 rounded-full opacity-30 blur-3xl" />
            <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] 
                      bg-primary-300 rounded-full opacity-20 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* ===== Left — Text ===== */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm 
                            border border-border rounded-full px-4 py-2 mb-6">
                            <FaStar className="text-primary-500" size={12} />
                            <span className="font-sans text-xs uppercase tracking-widest text-text-muted">
                                New Collection 2026
                            </span>
                        </div>

                        <h1 className="font-serif text-5xl lg:text-7xl text-text leading-tight mb-6">
                            Timeless
                            <span className="block text-primary-600 italic">Elegance</span>
                            for Every Woman
                        </h1>

                        <p className="font-sans text-lg text-text-muted leading-relaxed mb-8 
                          max-w-lg mx-auto lg:mx-0">
                            Discover handcrafted pieces that blend tradition with modern style.
                            Each piece tells a story of craftsmanship and care.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/shop"
                                className="group inline-flex items-center justify-center gap-3 
                           bg-primary-500 text-white px-8 py-4 rounded-lg 
                           font-sans text-sm uppercase tracking-wider 
                           hover:bg-primary-600 transition-all duration-normal 
                           shadow-soft hover:shadow-card"
                            >
                                Shop Now
                                <FaArrowRight size={14}
                                    className="group-hover:translate-x-1 transition-transform duration-normal" />
                            </Link>

                            <Link
                                to="/about"
                                className="inline-flex items-center justify-center 
                           bg-transparent text-text border border-text 
                           px-8 py-4 rounded-lg font-sans text-sm uppercase 
                           tracking-wider hover:bg-text hover:text-white 
                           transition-all duration-normal"
                            >
                                Our Story
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-8 justify-center lg:justify-start mt-12">
                            <div>
                                <p className="font-serif text-3xl text-primary-600 font-bold">500+</p>
                                <p className="font-sans text-xs uppercase tracking-wider text-text-muted">
                                    Products
                                </p>
                            </div>
                            <div className="w-[1px] h-10 bg-border" />
                            <div>
                                <p className="font-serif text-3xl text-primary-600 font-bold">10K+</p>
                                <p className="font-sans text-xs uppercase tracking-wider text-text-muted">
                                    Happy Clients
                                </p>
                            </div>
                            <div className="w-[1px] h-10 bg-border" />
                            <div>
                                <p className="font-serif text-3xl text-primary-600 font-bold">4.9</p>
                                <p className="font-sans text-xs uppercase tracking-wider text-text-muted">
                                    Rating
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ===== Right — Interactive Card ===== */}
                    <div className="relative">
                        <div
                            onClick={handleCardClick}
                            className="relative rounded-2xl overflow-hidden shadow-card 
                         w-full h-[500px] lg:h-[600px] 
                         bg-secondary-200 cursor-pointer group"
                        >

                            {/* ===== Layer 1: Fallback Images ===== */}
                            <div className={`absolute inset-0 transition-opacity duration-1000
                              ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}>
                                {dressImages.map((dress, index) => (
                                    <img
                                        key={dress.id}
                                        src={dress.url}
                                        alt={dress.name}
                                        className={`absolute inset-0 w-full h-full object-cover 
                                transition-all duration-1000 ease-luxury
                                ${index === currentIndex
                                                ? 'opacity-100 scale-100'
                                                : 'opacity-0 scale-105'}`}
                                    />
                                ))}
                            </div>

                            {/* ===== Layer 2: Video ===== */}
                            <video
                                ref={videoRef}
                                className={`absolute inset-0 w-full h-full object-cover 
                            transition-opacity duration-1000 ease-luxury
                            ${isVideoPlaying ? 'opacity-100' : 'opacity-0'}`}
                                muted
                                loop
                                playsInline
                                preload="auto"
                                onCanPlayThrough={handleVideoReady}
                                poster="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800"
                            >
                                <source src={heroVideo} type="video/mp4" />
                            </video>

                            {/* ===== Layer 3: Warm Overlay ===== */}
                            <div className="absolute inset-0 pointer-events-none
                              bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                            <div className="absolute inset-0 pointer-events-none 
                              bg-primary-500/10 mix-blend-overlay" />

                            <div className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle at center, transparent 40%, rgba(44, 36, 22, 0.3) 100%)'
                                }} />

                            {/* ===== Layer 4: Play/Pause Indicator (Center) ===== */}
                            <div className={`absolute inset-0 flex items-center justify-center 
                              transition-opacity duration-500 pointer-events-none
                              ${isVideoPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full 
                                flex items-center justify-center shadow-card
                                transform group-hover:scale-110 transition-transform duration-300">
                                    {isVideoPlaying ? (
                                        <FaPause className="text-primary-600 ml-0" size={24} />
                                    ) : (
                                        <FaPlay className="text-primary-600 ml-1" size={24} />
                                    )}
                                </div>
                            </div>

                            {/* ===== Layer 5: Text Overlay ===== */}
                            <div className="absolute bottom-6 left-6 right-6 
                              flex items-center justify-between">
                                <div>
                                    <p className="font-sans text-xs uppercase tracking-widest 
                                text-white/70 mb-1">
                                        {isVideoPlaying ? 'Now Playing' : 'Featured'}
                                    </p>
                                    <p className="font-serif text-xl text-white">
                                        {isVideoPlaying
                                            ? 'New Collection 2026'
                                            : dressImages[currentIndex].name}
                                    </p>
                                </div>

                                {/* Dots — sirf jab video playing na ho */}
                                {!isVideoPlaying && (
                                    <div className="flex gap-2">
                                        {dressImages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setCurrentIndex(index)
                                                    setHasUserInteracted(true)
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all duration-300
                                    ${index === currentIndex
                                                        ? 'bg-white w-6'
                                                        : 'bg-white/50 hover:bg-white/80'}`}
                                                aria-label={`Go to image ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Live Indicator — jab video playing ho */}
                                {isVideoPlaying && (
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        <span className="font-sans text-xs text-white/80 uppercase tracking-wider">
                                            Live
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* ===== Layer 6: Click Hint ===== */}
                            {!isVideoPlaying && (
                                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm 
                                rounded-full px-3 py-1.5 flex items-center gap-2
                                opacity-0 group-hover:opacity-100 
                                transition-opacity duration-300">
                                    <span className="font-sans text-xs text-text-muted">
                                        Click to change
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Floating Card — Top */}
                        <div className="absolute top-6 -left-4 lg:-left-8 bg-white rounded-xl 
                            shadow-card p-4 flex items-center gap-3 
                            hidden sm:flex pointer-events-none">
                            <div className="w-12 h-12 bg-primary-100 rounded-full 
                              flex items-center justify-center">
                                <span className="font-serif text-xl text-primary-600">✓</span>
                            </div>
                            <div>
                                <p className="font-serif text-sm text-text font-semibold">Premium Quality</p>
                                <p className="font-sans text-xs text-text-muted">Handcrafted</p>
                            </div>
                        </div>

                        {/* Floating Card — Bottom */}
                        <div className="absolute bottom-6 -right-4 lg:-right-8 bg-white rounded-xl 
                            shadow-card p-4 flex items-center gap-3 
                            hidden sm:flex pointer-events-none">
                            <div className="w-12 h-12 bg-secondary-200 rounded-full 
                              flex items-center justify-center">
                                <span className="font-serif text-xl text-primary-600">★</span>
                            </div>
                            <div>
                                <p className="font-serif text-sm text-text font-semibold">5.0 Rating</p>
                                <p className="font-sans text-xs text-text-muted">From 2K+ reviews</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection
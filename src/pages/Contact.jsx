// src/pages/Contact.jsx
import { useState } from 'react'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt size={20} />,
      title: 'Visit Us',
      lines: ['123 Fashion Street', 'Gulberg, Lahore, Pakistan']
    },
    {
      icon: <FaPhoneAlt size={18} />,
      title: 'Call Us',
      lines: ['+92 300 1234567', '+92 42 3456789']
    },
    {
      icon: <FaEnvelope size={20} />,
      title: 'Email Us',
      lines: ['hello@eleganceboutique.com', 'support@eleganceboutique.com']
    },
    {
      icon: <FaClock size={20} />,
      title: 'Working Hours',
      lines: ['Mon - Sat: 10AM - 8PM', 'Sunday: 12PM - 6PM']
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary-100 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary-500 mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-text mb-6">
            Contact Us
          </h1>
          <p className="font-sans text-lg text-text-muted max-w-2xl mx-auto">
            Have a question? We'd love to hear from you. Send us a message 
            and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info) => (
            <div key={info.title} 
                 className="bg-surface rounded-xl p-6 border border-border 
                            text-center hover:shadow-card 
                            transition-shadow duration-normal">
              <div className="w-12 h-12 bg-primary-100 rounded-full 
                              flex items-center justify-center 
                              text-primary-600 mx-auto mb-4">
                {info.icon}
              </div>
              <h3 className="font-serif text-lg text-text mb-3">
                {info.title}
              </h3>
              {info.lines.map((line, i) => (
                <p key={i} className="font-sans text-sm text-text-muted">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <div className="bg-surface rounded-2xl shadow-card p-8 lg:p-10 
                          border border-border">
            <h2 className="font-serif text-3xl text-text mb-6">
              Send Us a Message
            </h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 
                              rounded-lg p-6 text-center">
                <p className="font-serif text-xl text-green-700 mb-2">
                  Message Sent!
                </p>
                <p className="font-sans text-sm text-green-600">
                  We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-sans text-sm text-text mb-2 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg 
                               px-4 py-3 font-sans text-sm text-text 
                               focus:outline-none focus:border-primary-500 
                               transition-colors duration-normal"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="font-sans text-sm text-text mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg 
                               px-4 py-3 font-sans text-sm text-text 
                               focus:outline-none focus:border-primary-500 
                               transition-colors duration-normal"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="font-sans text-sm text-text mb-2 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg 
                               px-4 py-3 font-sans text-sm text-text 
                               focus:outline-none focus:border-primary-500 
                               transition-colors duration-normal"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="font-sans text-sm text-text mb-2 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-background border border-border rounded-lg 
                               px-4 py-3 font-sans text-sm text-text 
                               focus:outline-none focus:border-primary-500 
                               transition-colors duration-normal resize-none"
                    placeholder="Write your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white py-3 rounded-lg 
                             font-sans text-sm uppercase tracking-wider 
                             hover:bg-primary-600 transition-colors duration-normal"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-card h-[500px] 
                          bg-secondary-200">
            <iframe
              title="Boutique Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.853!2d74.3436!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjAnMzYuOSJF!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
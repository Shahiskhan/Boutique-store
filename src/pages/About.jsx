// src/pages/About.jsx
import { FaHeart, FaLeaf, FaAward, FaUsers } from 'react-icons/fa'

function About() {
  const values = [
    {
      icon: <FaHeart size={24} />,
      title: 'Made with Love',
      description: 'Every piece is handpicked with care and passion.'
    },
    {
      icon: <FaLeaf size={24} />,
      title: 'Sustainable',
      description: 'We source ethically and care for our planet.'
    },
    {
      icon: <FaAward size={24} />,
      title: 'Premium Quality',
      description: 'Only the finest materials make it to our store.'
    },
    {
      icon: <FaUsers size={24} />,
      title: 'Community First',
      description: 'Built by women, for women — supporting local artisans.'
    }
  ]

  const team = [
    {
      name: 'Ayesha Khan',
      role: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
    },
    {
      name: 'Sara Ahmed',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400'
    },
    {
      name: 'Fatima Ali',
      role: 'Customer Experience',
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400'
    }
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-secondary-100 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="font-sans text-xs uppercase tracking-widest text-primary-500 mb-3">
            About Us
          </p>
          <h1 className="font-serif text-5xl lg:text-6xl text-text mb-6">
            Our Story
          </h1>
          <p className="font-sans text-lg text-text-muted max-w-3xl mx-auto leading-relaxed">
            Elegance Boutique was born from a simple belief — every woman deserves 
            to feel beautiful, confident, and timeless. Since 2020, we've been 
            curating pieces that celebrate femininity and craftsmanship.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-card 
                          h-[400px] lg:h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800"
              alt="Boutique"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="font-serif text-4xl text-text mb-6">
              From a Small Dream to a Beloved Brand
            </h2>
            <p className="font-sans text-text-muted leading-relaxed mb-4">
              What started as a small boutique in Lahore has grown into a 
              beloved brand serving thousands of women across Pakistan. 
              Our journey has been shaped by our customers — their stories, 
              their style, and their trust.
            </p>
            <p className="font-sans text-text-muted leading-relaxed mb-4">
              We work closely with local artisans and designers to bring you 
              pieces that are not just beautiful, but meaningful. Each item 
              carries a story of craftsmanship and care.
            </p>
            <p className="font-sans text-text-muted leading-relaxed">
              Today, we're proud to be a part of your special moments — 
              weddings, celebrations, and everyday elegance.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary-100 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl lg:text-5xl text-text mb-4">
              What We Stand For
            </h2>
            <p className="font-sans text-text-muted max-w-2xl mx-auto">
              Our values shape everything we do — from sourcing to shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} 
                   className="bg-surface rounded-xl p-6 text-center 
                              shadow-soft hover:shadow-card 
                              transition-shadow duration-normal">
                <div className="w-14 h-14 bg-primary-100 rounded-full 
                                flex items-center justify-center 
                                text-primary-600 mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="font-serif text-xl text-text mb-2">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl text-text mb-4">
            Meet the Team
          </h2>
          <p className="font-sans text-text-muted max-w-2xl mx-auto">
            The passionate women behind Elegance Boutique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.name} 
                 className="group rounded-xl overflow-hidden bg-surface 
                            shadow-soft hover:shadow-card 
                            transition-all duration-normal">
              <div className="relative overflow-hidden h-80">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover 
                             transition-transform duration-slow ease-luxury 
                             group-hover:scale-110"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-xl text-text mb-1">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-primary-600">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
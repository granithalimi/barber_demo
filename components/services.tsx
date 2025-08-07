export default function Services(){
  return (
    <section id="services" className="py-20 bg-barber-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional grooming services tailored to your style and
            preferences
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 cursor-default">
          <div
            className="bg-barber-gray p-8 rounded-lg hover:transform hover:scale-105 transition-transform"
          >
            <div className="text-barber-gold text-4xl mb-4">
              <i className="fas fa-cut"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Classic Haircut</h3>
            <p className="text-gray-400 mb-4">
              Traditional cuts with modern precision
            </p>
            <p className="text-barber-gold font-semibold">$25</p>
          </div>
          <div
            className="bg-barber-gray p-8 rounded-lg hover:transform hover:scale-105 transition-transform"
          >
            <div className="text-barber-gold text-4xl mb-4">
              <i className="fas fa-razor"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Beard Trim</h3>
            <p className="text-gray-400 mb-4">
              Professional beard shaping and grooming
            </p>
            <p className="text-barber-gold font-semibold">$15</p>
          </div>
          <div
            className="bg-barber-gray p-8 rounded-lg hover:transform hover:scale-105 transition-transform"
          >
            <div className="text-barber-gold text-4xl mb-4">
              <i className="fas fa-spray-can"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Haircut & Beard</h3>
            <p className="text-gray-400 mb-4">Complete grooming package</p>
            <p className="text-barber-gold font-semibold">$35</p>
          </div>
          <div
            className="bg-barber-gray p-8 rounded-lg hover:transform hover:scale-105 transition-transform"
          >
            <div className="text-barber-gold text-4xl mb-4">
              <i className="fas fa-child"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Kids Haircut</h3>
            <p className="text-gray-400 mb-4">
              Specialized cuts for young gentlemen
            </p>
            <p className="text-barber-gold font-semibold">$20</p>
          </div>
          <div
            className="bg-barber-gray p-8 rounded-lg hover:transform hover:scale-105 transition-transform"
          >
            <div className="text-barber-gold text-4xl mb-4">
              <i className="fas fa-hot-tub"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Hot Towel Service</h3>
            <p className="text-gray-400 mb-4">Relaxing hot towel treatment</p>
            <p className="text-barber-gold font-semibold">$10</p>
          </div>
          <div
            className="bg-barber-gray p-8 rounded-lg hover:transform hover:scale-105 transition-transform"
          >
            <div className="text-barber-gold text-4xl mb-4">
              <i className="fas fa-palette"></i>
            </div>
            <h3 className="text-xl font-semibold mb-4">Hair Coloring</h3>
            <p className="text-gray-400 mb-4">
              Professional hair coloring services
            </p>
            <p className="text-barber-gold font-semibold">$45</p>
          </div>
        </div>
      </div>
    </section>
  )
}

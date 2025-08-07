export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About BarberShop
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              Founded in 2021, BarberShop has been the premier destination for
              men&apos;s grooming in the city. Our master barbers combine traditional
              techniques with modern trends to deliver exceptional results.
            </p>
            <p className="text-gray-400 text-lg mb-8">
              We pride ourselves on attention to detail, quality service, and
              creating a welcoming atmosphere where every client feels like
              family.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-barber-gold mb-2">
                  13+
                </div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-barber-gold mb-2">
                  10k+
                </div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-barber-gold mb-2">
                  5
                </div>
                <div className="text-gray-400">Expert Barbers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-barber-gold mb-2">
                  4.9
                </div>
                <div className="text-gray-400">Star Rating</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-barber-gold p-1 rounded-lg">
              <div className="bg-gray-900 rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Why Choose Us?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-barber-gold mr-3"></i>
                    <span>Licensed and experienced barbers</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-barber-gold mr-3"></i>
                    <span>Premium quality products</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-barber-gold mr-3"></i>
                    <span>Clean and modern facility</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-barber-gold mr-3"></i>
                    <span>Walk-ins welcome</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-barber-gold mr-3"></i>
                    <span>Online booking available</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-barber-gold mr-3"></i>
                    <span>Loyalty rewards program</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

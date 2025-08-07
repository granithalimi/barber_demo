export default function Footer() {
  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <i className="fas fa-cut text-barber-gold text-2xl mr-2"></i>
              <span className="text-xl font-bold text-white">BarberShop</span>
            </div>
            <p className="text-gray-400 mb-4">
              Premium grooming services for the modern gentleman.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-barber-gold transition-colors"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-barber-gold transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-barber-gold transition-colors"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#"
                  className="hover:text-barber-gold transition-colors"
                >
                  Haircuts
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-barber-gold transition-colors"
                >
                  Beard Trims
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-barber-gold transition-colors"
                >
                  Styling
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-barber-gold transition-colors"
                >
                  Coloring
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#about"
                  className="hover:text-barber-gold transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-barber-gold transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-barber-gold transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-barber-gold transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BarberShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

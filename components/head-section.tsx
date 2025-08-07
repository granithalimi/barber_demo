import Link from "next/link";

export default function HeadSection(){
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-gradient-to-tl from-gray-900 to-gray-600"
    >
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">Barber</span>
          <span className="text-gray-600">Shop</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Where Style Meets Precision
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Experience the finest grooming services with our expert barbers. From
          classic cuts to modern styles, we deliver excellence in every detail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#services"
            className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-950 transition-colors duration-500"
          >
            View Services
          </Link>
          <Link
            href={"/book"}
            className="border-2 border-barber-gold text-barber-gold px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black duration-500"
          >
            Book Appointment
          </Link>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Link href="#services" className="text-barber-gold animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </Link>
      </div>
    </section>
  )
}

import React from "react";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="bg-white shadow-lg py-4 fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold text-gray-800">
            <a href="/" className="hover:text-yellow-500">Stylo Store</a>
          </div>
          <div className="space-x-6 text-gray-800">
            <a href="/" className="hover:text-yellow-500">New Arrivals</a>
            <a href="/" className="hover:text-yellow-500">About</a>
            <a href="/" className="hover:text-yellow-500">Collections</a>
            <a href="/" className="hover:text-yellow-500">Testimonials</a>
            <a href="/" className="hover:text-yellow-500">Subscribe</a>
            <a href="/login" className="hover:text-yellow-500">Login</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?fashion')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white flex flex-col justify-center items-center h-full">
          <h1 className="text-6xl font-bold mb-4 uppercase animate-fadeIn">60% Off Fall Essentials</h1>
          <p className="text-xl mb-8 animate-slideInLeft">Plus 50% Off Everything Else!</p>
          <a href="/shop" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full transition duration-300 animate-bounce">
            Shop Now
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About Stylo Store</h2>
          <p className="text-lg mb-8 text-gray-700">
            Stylo Store offers the latest trends in fashion, featuring collections that are elegant, affordable, and always in style. With over 10 years of experience, we provide top-quality products that meet the needs of every fashion enthusiast.
          </p>
        </div>
      </section>

      {/* Sección de Productos Destacados */}
      <section id="collections" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Explore Our Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img src="https://source.unsplash.com/400x500/?dress" alt="Dress" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-3xl font-bold mb-2">Dresses</h3>
                <a href="/shop/dresses" className="bg-white text-black py-2 px-4 rounded-full">Shop Now</a>
              </div>
            </div>

            <div className="group relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img src="https://source.unsplash.com/400x500/?shoes" alt="Shoes" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-3xl font-bold mb-2">Shoes</h3>
                <a href="/shop/shoes" className="bg-white text-black py-2 px-4 rounded-full">Shop Now</a>
              </div>
            </div>

            <div className="group relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img src="https://source.unsplash.com/400x500/?accessories" alt="Accessories" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-3xl font-bold mb-2">Accessories</h3>
                <a href="/shop/accessories" className="bg-white text-black py-2 px-4 rounded-full">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="italic text-lg mb-4">"Stylo Store has the best fashion trends! I always find what I'm looking for."</p>
              <h3 className="text-xl font-bold">- Emily Johnson</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="italic text-lg mb-4">"Great quality and amazing customer service! I highly recommend them."</p>
              <h3 className="text-xl font-bold">- Mark Thompson</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="italic text-lg mb-4">"Fast shipping and beautiful designs. I'm obsessed with Stylo Store!"</p>
              <h3 className="text-xl font-bold">- Sarah Parker</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="mb-8 text-lg">Get the latest updates on new arrivals and exclusive discounts!</p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-lg border-none outline-none w-72 text-black"
            />
            <button className="bg-yellow-400 text-black py-3 px-6 rounded-r-lg hover:bg-yellow-500 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg mb-8 text-gray-700">
            Have questions? Reach out to us, and we'll get back to you as soon as possible.
          </p>
          <a href="mailto:support@stylostore.com" className="bg-yellow-400 hover:bg-yellow-500 text-black py-3 px-6 rounded-full transition duration-300">Contact Us</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Stylo Store. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

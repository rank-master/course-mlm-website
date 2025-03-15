'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'; // Add this

export default function Contact() {
  return (
    <div className="min-h-screen bg-amber-100">
      <Navbar />
      <div className="pt-20 pb-8 px-4 sm:px-6 max-w-4xl mx-auto">
        <section className="card bg-white shadow-xl rounded-2xl p-6 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-6 flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl">📞</span> Contact Us
          </h1>
          <p className="text-orange-700 mb-4">
            Got questions? We’re here to help! Reach out to us:
          </p>
          <ul className="list-none space-y-4 text-orange-700">
            <li className="flex items-center gap-3">
              <span className="text-2xl">✉️</span> Email: <a href="mailto:support@9ties.com" className="hover:underline text-orange-600">support@9ties.com</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">📱</span> WhatsApp: <a href="https://wa.me/9707839680" className="hover:underline text-orange-600">+91 9707839680</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl">🌍</span> Address: 9ties HQ, Somewhere Festive, India
            </li>
          </ul>
        </section>
      </div>
      <Footer /> {/* Replace inline footer */}
    </div>
  );
}
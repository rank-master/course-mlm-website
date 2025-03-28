'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'; // Add this

export default function Privacy() {
  return (
    <div className="min-h-screen bg-amber-100">
      <Navbar />
      <div className="pt-20 pb-8 px-4 sm:px-6 max-w-4xl mx-auto">
        <section className="card bg-white shadow-xl rounded-2xl p-6 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-6 flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl">🔒</span> Privacy Policy
          </h1>
          <p className="text-orange-700 mb-4">
            At 9ties, we value your privacy. Here’s how we handle your data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-orange-700">
            <li>We collect your name, email, and payment info for account and payout purposes.</li>
            <li>Your data is never sold to third parties.</li>
            <li>We use cookies to enhance your experience.</li>
            <li>Contact us to request data deletion or updates.</li>
          </ul>
          <p className="text-orange-700 mt-4">
            Last updated: March 15, 2025
          </p>
        </section>
      </div>
      <Footer /> {/* Replace inline footer */}
    </div>
  );
}
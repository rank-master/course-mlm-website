'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'; // Add this

export default function Terms() {
  return (
    <div className="min-h-screen bg-amber-100">
      <Navbar />
      <div className="pt-20 pb-8 px-4 sm:px-6 max-w-4xl mx-auto">
        <section className="card bg-white shadow-xl rounded-2xl p-6 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-6 flex items-center justify-center gap-3">
            <span className="text-4xl sm:text-5xl">📜</span> Terms & Conditions
          </h1>
          <p className="text-orange-700 mb-4">
            Welcome to 9ties! By using our platform, you agree to the following terms:
          </p>
          <ul className="list-disc list-inside space-y-2 text-orange-700">
            <li>You must be 16+ to participate.</li>
            <li>Earnings are based on our referral program as outlined in &quot;How It Works.&quot;</li>
            <li>We reserve the right to modify or terminate the program at any time.</li>
            <li>Payments are processed as per our payout schedule.</li>
            <li>Contact us for disputes or questions.</li>
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

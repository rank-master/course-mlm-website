'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref') || '';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [referral, setReferral] = useState(referralCode); // Auto-fill from URL
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Call the signup API route with referral code
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, referral }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      // Auto-sign-in after signup
      const signInResult = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/dashboard',
      });

      if (signInResult?.error) {
        setError(signInResult.error);
        setLoading(false);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Something went wrong during signup');
      console.error('Signup Client Error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 p-4">
      <div className="card bg-white shadow-xl rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center flex items-center justify-center gap-2">
          <span className="text-4xl">🌟</span> Sign Up
        </h1>
        <p className="text-center mb-6 text-orange-700">Create your account and start earning!</p>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-orange-700 mb-1 font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-orange-700"
              required
            />
          </div>
          <div>
            <label className="block text-orange-700 mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-orange-700"
              required
            />
          </div>
          <div>
            <label className="block text-orange-700 mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-orange-700"
              required
            />
          </div>
          <div>
            <label className="block text-orange-700 mb-1 font-semibold">Referral Code (Optional)</label>
            <input
              type="text"
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder="Enter referral code"
              className="w-full p-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-orange-700"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300 w-full"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-4 text-orange-700">
          Already have an account?{' '}
          <Link href="/login" className="text-orange-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
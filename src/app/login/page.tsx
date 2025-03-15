'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-100 p-4">
      <div className="card bg-white shadow-xl rounded-2xl p-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center flex items-center justify-center gap-2">
          <span className="text-4xl">🔑</span> Login
        </h1>
        <p className="text-center mb-6 text-orange-700">Access your account and start earning!</p>
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            disabled={loading}
            className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300 w-full"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-orange-700">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-orange-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
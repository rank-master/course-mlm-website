'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer'; // Add this


export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [referredUsers, setReferredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status, router]);

  const fetchData = async () => {
    try {
      const [transactionsRes, usersRes] = await Promise.all([
        fetch('/api/transactions', { cache: 'no-store' }),
        fetch('/api/users/me', { cache: 'no-store' }).catch(() => null),
      ]);

      if (!transactionsRes.ok) throw new Error('Failed to fetch transactions');
      const txs = await transactionsRes.json();
      setTransactions(txs);

      if (usersRes && usersRes.ok) {
        const userData = await usersRes.json();
        setReferredUsers(userData?.referredUsers || []);
      } else {
        console.warn('Could not fetch referred users; defaulting to empty list.');
        setReferredUsers([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTransactions([]);
      setReferredUsers([]);
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100 text-2xl font-bold text-orange-600">
        <span className="animate-pulse flex items-center gap-3">
          <span className="text-3xl">🪔</span> Lighting Up Your Dashboard...
        </span>
      </div>
    );
  }

  const user = session?.user;
  const totalEarned = transactions.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0);
  const passiveIncome = transactions
    .filter((t) => t.type === 'passive')
    .reduce((sum, t) => sum + t.amount, 0);
  const superPassiveIncome = transactions
    .filter((t) => t.type === 'super_passive')
    .reduce((sum, t) => sum + t.amount, 0);
  const passiveSources = transactions
    .filter((t) => t.type === 'passive' || t.type === 'super_passive')
    .map((t) => ({
      amount: t.amount,
      from: t.reason.split('from ')[1] || 'Unknown',
      type: t.type === 'passive' ? 'Friend Bonus' : 'Super Friend Bonus',
    }));

  return (
    <div className="min-h-screen bg-amber-100">
      <Navbar />
      {/* Main Content */}
      <div className="pt-16 pb-8 px-4 sm:px-6 max-w-6xl mx-auto space-y-6">
        {/* Welcome Section */}
        <section className="card bg-gradient-to-r from-yellow-300 to-orange-300 shadow-xl rounded-2xl p-6 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-800 flex items-center gap-2">
            <span className="text-4xl sm:text-5xl">🪔</span> Welcome, {user?.name || 'Star'}!
          </h1>
          <p className="text-lg sm:text-xl text-orange-700 mt-2">
            Your journey to big wins starts here! 🌸
          </p>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="card bg-yellow-400 text-orange-800 shadow-xl rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-shadow">
            <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">💰</span> Your Balance
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold mt-2">₹{(user?.balance || 0).toFixed(2)}</p>
          </div>
          <div className="card bg-green-400 text-orange-800 shadow-xl rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-shadow">
            <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🏆</span> Total Earnings
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold mt-2">₹{totalEarned.toFixed(2)}</p>
          </div>
          <div className="card bg-pink-400 text-orange-800 shadow-xl rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-shadow">
            <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🌺</span> Passive Income
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold mt-2">₹{passiveIncome.toFixed(2)}</p>
          </div>
          <div className="card bg-orange-400 text-orange-800 shadow-xl rounded-2xl p-4 sm:p-6 hover:shadow-2xl transition-shadow">
            <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">✨</span> Super Passive Income
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold mt-2">₹{superPassiveIncome.toFixed(2)}</p>
          </div>
        </section>

        {/* Highlights Section
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/*
          <div className="card bg-white shadow-xl rounded-2xl p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">🤝</span> Your Friends
            </h2>
            {referredUsers.length > 0 ? (
              <div className="space-y-3">
                {referredUsers.slice(0, 3).map((ref: any) => (
                  <div
                    key={ref._id}
                    className="bg-yellow-100 p-3 rounded-xl flex items-center gap-3 hover:bg-yellow-200 transition-colors"
                  >
                    <span className="text-xl sm:text-2xl">🌸</span>
                    <div>
                      <p className="text-orange-700 font-bold text-sm sm:text-base">{ref.name || 'Friend'}</p>
                      <p className="text-orange-600 text-xs sm:text-sm">{ref.email}</p>
                    </div>
                  </div>
                ))}
                {referredUsers.length > 3 && (
                  <Link href="/dashboard/referrals" className="text-orange-600 hover:underline text-sm sm:text-base">
                    See All Friends ({referredUsers.length})
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-orange-600 text-sm sm:text-lg flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🥳</span> Invite friends to grow your team!
              </p>
            )}
          </div>

         
          <div className="card bg-white shadow-xl rounded-2xl p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">💸</span> Latest Wins
            </h2>
            {passiveSources.length > 0 ? (
              <div className="space-y-3">
                {passiveSources.slice(0, 3).map((source: any, index: number) => (
                  <div
                    key={index}
                    className="bg-green-100 p-3 rounded-xl flex justify-between items-center hover:bg-green-200 transition-colors"
                  >
                    <p className="text-orange-700 text-sm sm:text-base">
                      <span className="font-bold text-purple-600">{source.from}</span> ({source.type})
                    </p>
                    <p className="text-green-600 font-bold text-sm sm:text-base">₹{source.amount.toFixed(2)}</p>
                  </div>
                ))}
                {passiveSources.length > 3 && (
                  <Link href="/dashboard/earnings" className="text-orange-600 hover:underline text-sm sm:text-base">
                    See All Wins ({passiveSources.length})
                  </Link>
                )}
              </div>
            ) : (
              <p className="text-orange-600 text-sm sm:text-lg flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🎁</span> Start earning with friends!
              </p>
            )}
          </div>
        </section>*/}

        {/* Transaction Summary */}
        <section className="card bg-white shadow-xl rounded-2xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">📜</span> Recent Activity
          </h2>
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="py-2 sm:py-3 text-sm sm:text-base">Date</th>
                    <th className="py-2 sm:py-3 text-sm sm:text-base">Amount</th>
                    <th className="py-2 sm:py-3 text-sm sm:text-base">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((t: any, index: number) => (
                    <tr key={index} className="hover:bg-orange-50 transition-colors">
                      <td className="text-orange-700 text-sm sm:text-base">{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td className={`${t.amount >= 0 ? 'text-green-600' : 'text-red-500'} text-sm sm:text-base`}>
                        {t.amount >= 0 ? '+' : ''}₹{t.amount.toFixed(2)}
                      </td>
                      <td className="text-orange-700 text-sm sm:text-base">{t.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {transactions.length > 5 && (
                <Link href="/dashboard/history" className="text-orange-600 hover:underline mt-4 block text-sm sm:text-base">
                  See All Activity ({transactions.length})
                </Link>
              )}
            </div>
          ) : (
            <p className="text-orange-600 text-sm sm:text-lg flex items-center gap-2">
              <span className="text-xl sm:text-2xl">🌟</span> No activity yet—let’s make some magic!
            </p>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}
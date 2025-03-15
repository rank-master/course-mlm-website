'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  email: string;
  name: string;
  referralCode: string;
  balance: number;
  purchasedCourses: string[];
  referredBy?: string;
}

interface Course {
  _id: string;
  name: string;
  price: number;
}

interface SalePreview {
  seller: { id: string; email: string; amount: number } | null;
  passive: { id: string; email: string; amount: number } | null;
  superPassive: { id: string; email: string; amount: number } | null;
  buyerId: string;
  courseId: string;
}

export default function Admin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [saleForm, setSaleForm] = useState({ buyerEmail: '', courseId: '', manualReferralCode: '' });
  const [salePreview, setSalePreview] = useState<SalePreview | null>(null);
  const [isFirstUserPrompt, setIsFirstUserPrompt] = useState(false);
  const [isFirstUser, setIsFirstUser] = useState<boolean | null>(null);
  const [config, setConfig] = useState({
    firstSale: { seller: 0.8, passive: 0.1, superPassive: 0.05 },
    subsequentSale: { seller: 0.6, passive: 0.2, superPassive: 0.1 },
  });
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editRemarks, setEditRemarks] = useState('');
  const [newCourse, setNewCourse] = useState({ name: '', price: '' });
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [isEditingInView, setIsEditingInView] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated' && !session?.user?.isAdmin) {
      router.push('/dashboard');
    } else if (status === 'authenticated') {
      fetchData();
    }
  }, [status, session, router]);

  const fetchData = async () => {
    try {
      const [usersRes, coursesRes, configRes] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/courses'),
        fetch('/api/referral-config'),
      ]);
      if (!usersRes.ok || !coursesRes.ok || !configRes.ok) throw new Error('Failed to fetch data');
      const usersData: User[] = await usersRes.json();
      const coursesData: Course[] = await coursesRes.json();
      const configData = await configRes.json();
      setUsers(usersData);
      setFilteredUsers(usersData);
      setCourses(coursesData);
      setConfig(configData.global || config);
      setLoading(false);
    } catch (error: unknown) {
      console.error('Admin Data Fetch Error:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to load data' });
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete user');
        setUsers(users.filter((u) => u._id !== userId));
        setFilteredUsers(filteredUsers.filter((u) => u._id !== userId));
        setMessage({ type: 'success', text: 'User deleted successfully' });
        if (viewUser?._id === userId) setViewUser(null);
      } catch (error: unknown) {
        setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to delete user' });
      }
    }
  };

  const handleRegisterSale = async () => {
    try {
      const buyer = users.find((u) => u.email === saleForm.buyerEmail);
      if (!buyer) throw new Error('Buyer not found');
      if (buyer.purchasedCourses.includes(saleForm.courseId)) {
        setMessage({ type: 'error', text: 'This user already owns this course' });
        return;
      }
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerEmail: saleForm.buyerEmail,
          courseId: saleForm.courseId,
          manualReferralCode: isFirstUser === false ? saleForm.manualReferralCode : undefined,
          isFirstUser,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to preview sale');
      }
      const preview: SalePreview = await res.json();
      setSalePreview(preview);
      setIsFirstUserPrompt(false);
      setIsFirstUser(null);
      setMessage({ type: 'success', text: 'Sale preview generated' });
    } catch (error: unknown) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to register sale' });
    }
  };

  const handleConfirmSale = async () => {
    if (!salePreview) return;
    try {
      const res = await fetch('/api/sales', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(salePreview),
      });
      if (!res.ok) throw new Error('Failed to confirm sale');
      setSalePreview(null);
      setSaleForm({ buyerEmail: '', courseId: '', manualReferralCode: '' });
      await fetchData();
      setMessage({ type: 'success', text: 'Sale registered, user dashboard activated' });
    } catch (error: unknown) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to confirm sale' });
    }
  };

  const handleEditUser = async () => {
    if (!editUser) return;
    try {
      const res = await fetch(`/api/users/${editUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editUser, remarks: editRemarks || '' }),
      });
      if (!res.ok) throw new Error('Failed to update user');
      setEditUser(null);
      setEditRemarks('');
      await fetchData();
      setMessage({ type: 'success', text: 'User updated successfully' });
    } catch (error: unknown) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update user' });
    }
  };

  const handleAddCourse = async () => {
    try {
      const price = parseInt(newCourse.price);
      if (isNaN(price)) throw new Error('Invalid price');
      const res = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCourse.name, price }),
      });
      if (!res.ok) throw new Error('Failed to add course');
      setNewCourse({ name: '', price: '' });
      await fetchData();
      setMessage({ type: 'success', text: 'Course added successfully' });
    } catch (error: unknown) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to add course' });
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        const res = await fetch(`/api/courses?id=${courseId}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete course');
        await fetchData();
        setMessage({ type: 'success', text: 'Course deleted successfully' });
      } catch (error: unknown) {
        setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to delete course' });
      }
    }
  };

  const handleConfigUpdate = async () => {
    try {
      const res = await fetch('/api/referral-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ global: config }),
      });
      if (!res.ok) throw new Error('Failed to update config');
      setShowReferralModal(false);
      setMessage({ type: 'success', text: 'Referral config updated' });
    } catch (error: unknown) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update config' });
    }
  };

  const handleConfigReset = async () => {
    try {
      const res = await fetch('/api/referral-config', { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to reset config');
      setConfig({ firstSale: { seller: 0.8, passive: 0.1, superPassive: 0.05 }, subsequentSale: { seller: 0.6, passive: 0.2, superPassive: 0.1 } });
      setShowReferralModal(false);
      setMessage({ type: 'success', text: 'Referral config reset to default' });
    } catch (error: unknown) {
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to reset config' });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const copyReferralLink = (referralCode: string) => {
    const link = `${window.location.origin}/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setMessage({ type: 'success', text: 'Referral link copied to clipboard!' });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100 text-orange-700">
        <span className="text-2xl animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-orange-600 text-center flex items-center justify-center gap-3">
          Admin Control Panel
        </h1>

        {message && (
          <div
            className={`p-4 rounded-xl shadow-md animate-fade-in ${
              message.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}
          >
            {message.text}
            <button className="ml-4 text-sm underline" onClick={() => setMessage(null)}>
              Dismiss
            </button>
          </div>
        )}

        {/* Register Sale */}
        <div className="card bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
            <span className="text-3xl">💰</span> Register Sale
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-orange-700 mb-1 font-semibold">Buyer Email</label>
              <input
                type="email"
                placeholder="Enter buyer email"
                className="w-full p-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-orange-700"
                value={saleForm.buyerEmail}
                onChange={(e) => setSaleForm({ ...saleForm, buyerEmail: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-orange-700 mb-1 font-semibold">Course Purchased</label>
              <select
                className="w-full p-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-orange-700"
                value={saleForm.courseId}
                onChange={(e) => setSaleForm({ ...saleForm, courseId: e.target.value })}
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name} (₹{course.price})
                  </option>
                ))}
              </select>
            </div>
            {isFirstUserPrompt && (
              <div>
                <label className="block text-orange-700 mb-1 font-semibold">Is this the first user?</label>
                <div className="flex gap-4">
                  <button
                    className="btn bg-green-400 text-orange-800 hover:bg-green-500"
                    onClick={() => {
                      setIsFirstUser(true);
                      handleRegisterSale();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300"
                    onClick={() => setIsFirstUser(false)}
                  >
                    No
                  </button>
                </div>
                {isFirstUser === false && (
                  <input
                    type="text"
                    placeholder="Enter referrer’s referral code"
                    className="w-full p-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-orange-700 mt-2"
                    value={saleForm.manualReferralCode}
                    onChange={(e) => setSaleForm({ ...saleForm, manualReferralCode: e.target.value })}
                  />
                )}
              </div>
            )}
            <button
              className="btn bg-orange-500 text-white hover:bg-orange-600"
              onClick={() =>
                saleForm.buyerEmail && saleForm.courseId && !isFirstUserPrompt
                  ? setIsFirstUserPrompt(true)
                  : handleRegisterSale()
              }
            >
              Register Sale
            </button>
          </div>

          {salePreview && (
            <div className="mt-6 card bg-amber-50 shadow-md rounded-2xl p-4">
              <h3 className="text-xl font-semibold text-orange-600">Sale Confirmation</h3>
              <div className="space-y-4">
                {salePreview.seller && (
                  <div>
                    <label className="block text-orange-700 mb-1 font-semibold">Seller Commission</label>
                    <input
                      type="number"
                      className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                      value={salePreview.seller.amount}
                      onChange={(e) =>
                        setSalePreview({
                          ...salePreview,
                          seller: salePreview.seller ? { ...salePreview.seller, amount: parseFloat(e.target.value) } : null,
                        })
                      }
                    />
                    <p className="text-orange-700">User: {salePreview.seller.email}</p>
                  </div>
                )}
                {salePreview.passive && (
                  <div>
                    <label className="block text-orange-700 mb-1 font-semibold">Passive Income</label>
                    <input
                      type="number"
                      className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                      value={salePreview.passive.amount}
                      onChange={(e) =>
                        setSalePreview({
                          ...salePreview,
                          passive: salePreview.passive ? { ...salePreview.passive, amount: parseFloat(e.target.value) } : null,
                        })
                      }
                    />
                    <p className="text-orange-700">User: {salePreview.passive.email}</p>
                  </div>
                )}
                {salePreview.superPassive && (
                  <div>
                    <label className="block text-orange-700 mb-1 font-semibold">Super Passive Income</label>
                    <input
                      type="number"
                      className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                      value={salePreview.superPassive.amount}
                      onChange={(e) =>
                        setSalePreview({
                          ...salePreview,
                          superPassive: salePreview.superPassive
                            ? { ...salePreview.superPassive, amount: parseFloat(e.target.value) }
                            : null,
                        })
                      }
                    />
                    <p className="text-orange-700">User: {salePreview.superPassive.email}</p>
                  </div>
                )}
              </div>
              <button
                className="btn bg-green-400 text-orange-800 hover:bg-green-500 mt-4"
                onClick={handleConfirmSale}
              >
                Confirm Sale
              </button>
            </div>
          )}
        </div>

        {/* User Management */}
        <div className="card bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
            <span className="text-3xl">👥</span> User Management
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by email or name..."
              className="w-full p-2 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-orange-700"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="hidden md:table-cell">Email</th>
                  <th>Name</th>
                  <th className="hidden md:table-cell">Referral Code</th>
                  <th className="hidden md:table-cell">Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-amber-50">
                    <td className="hidden md:table-cell">{user.email}</td>
                    <td>{user.name}</td>
                    <td className="hidden md:table-cell">{user.referralCode}</td>
                    <td className="hidden md:table-cell">₹{user.balance.toFixed(2)}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600"
                        onClick={() => setEditUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm bg-yellow-400 text-orange-800 hover:bg-yellow-300"
                        onClick={() => setViewUser(user)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600 md:hidden"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editUser && (
            <div className="mt-4 space-y-4">
              <input
                type="text"
                className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              <input
                type="email"
                className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              <input
                type="number"
                className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                value={editUser.balance}
                onChange={(e) => setEditUser({ ...editUser, balance: parseFloat(e.target.value) })}
              />
              <input
                type="text"
                className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                placeholder="Optional remarks/reason for balance change"
                value={editRemarks}
                onChange={(e) => setEditRemarks(e.target.value)}
              />
              <div className="flex gap-4">
                <button
                  className="btn bg-green-400 text-orange-800 hover:bg-green-500"
                  onClick={handleEditUser}
                >
                  Save
                </button>
                <button
                  className="btn bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => {
                    setEditUser(null);
                    setEditRemarks('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* View User Modal */}
        {viewUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="card bg-white shadow-xl rounded-2xl p-6 max-w-lg w-full">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">User Details: {viewUser.name}</h3>
              {isEditingInView ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-orange-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                      value={viewUser.name}
                      onChange={(e) => setViewUser({ ...viewUser, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-orange-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                      value={viewUser.email}
                      onChange={(e) => setViewUser({ ...viewUser, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-orange-700 mb-1">Balance</label>
                    <input
                      type="number"
                      className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                      value={viewUser.balance}
                      onChange={(e) => setViewUser({ ...viewUser, balance: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-orange-700 mb-1">Remarks</label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                      placeholder="Reason for changes"
                      value={editRemarks}
                      onChange={(e) => setEditRemarks(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p><strong>Email:</strong> {viewUser.email}</p>
                  <p><strong>Referral Code:</strong> {viewUser.referralCode}</p>
                  <p><strong>Balance:</strong> ₹{viewUser.balance.toFixed(2)}</p>
                  <p>
                    <strong>Referral Link:</strong>{' '}
                    <span className="text-orange-700">{`${window.location.origin}/signup?ref=${viewUser.referralCode}`}</span>
                    <button
                      className="ml-2 btn btn-sm bg-yellow-400 text-orange-800 hover:bg-yellow-300"
                      onClick={() => copyReferralLink(viewUser.referralCode)}
                    >
                      Copy
                    </button>
                  </p>
                  <p>
                    <strong>Referred By:</strong>{' '}
                    {viewUser.referredBy
                      ? users.find((u) => u._id === viewUser.referredBy)?.email || 'Unknown'
                      : 'None'}
                  </p>
                  <p>
                    <strong>Passive Income To:</strong>{' '}
                    {viewUser.referredBy
                      ? users.find((u) => u._id === viewUser.referredBy)?.email || 'Unknown'
                      : 'None'}
                  </p>
                  <p>
                    <strong>Super Passive Income To:</strong>{' '}
                    {viewUser.referredBy
                      ? users.find((u) => u._id === users.find((u) => u._id === viewUser.referredBy)?.referredBy)?.email || 'None'
                      : 'None'}
                  </p>
                  <p><strong>Purchased Courses:</strong> {viewUser.purchasedCourses.length || 'None'}</p>
                </div>
              )}
              <div className="flex gap-4 mt-6 justify-end">
                {isEditingInView ? (
                  <>
                    <button
                      className="btn bg-green-400 text-orange-800 hover:bg-green-500"
                      onClick={async () => {
                        await handleEditUser();
                        setIsEditingInView(false);
                        setEditUser(null);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="btn bg-orange-500 text-white hover:bg-orange-600"
                      onClick={() => setIsEditingInView(false)}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn bg-orange-500 text-white hover:bg-orange-600"
                      onClick={() => {
                        setEditUser(viewUser);
                        setIsEditingInView(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn bg-red-500 text-white hover:bg-red-600"
                      onClick={() => handleDeleteUser(viewUser._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
                <button
                  className="btn bg-amber-200 text-orange-700 hover:bg-amber-300"
                  onClick={() => setViewUser(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Course Management */}
        <div className="card bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
            <span className="text-3xl">📚</span> Course Management
          </h2>
          <div className="space-y-4 mb-4">
            <label className="block text-orange-700 mb-1 font-semibold">Add New Course</label>
            <input
              type="text"
              placeholder="Course Name"
              className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price (₹)"
              className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
              value={newCourse.price}
              onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
            />
            <button
              className="btn bg-orange-500 text-white hover:bg-orange-600"
              onClick={handleAddCourse}
            >
              Add Course
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th>Name</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-amber-50">
                    <td>{course.name}</td>
                    <td>₹{course.price}</td>
                    <td>
                      <button
                        className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                        onClick={() => handleDeleteCourse(course._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Referral Settings */}
        <div className="card bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
            <span className="text-3xl">🔧</span> Referral Settings
          </h2>
          <button
            className="btn bg-orange-500 text-white hover:bg-orange-600"
            onClick={() => setShowReferralModal(true)}
          >
            Edit Referral Settings
          </button>
        </div>

        {showReferralModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="card bg-white shadow-xl rounded-2xl p-6 max-w-lg w-full">
              <h3 className="text-xl font-semibold text-orange-600">Referral Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-medium text-orange-700">First Sale</h4>
                  <label className="block text-orange-700 mb-1">Seller (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                    value={config.firstSale.seller * 100}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        firstSale: { ...config.firstSale, seller: parseFloat(e.target.value) / 100 },
                      })
                    }
                  />
                  <label className="block text-orange-700 mb-1 mt-2">Passive (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                    value={config.firstSale.passive * 100}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        firstSale: { ...config.firstSale, passive: parseFloat(e.target.value) / 100 },
                      })
                    }
                  />
                  <label className="block text-orange-700 mb-1 mt-2">Super Passive (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                    value={config.firstSale.superPassive * 100}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        firstSale: { ...config.firstSale, superPassive: parseFloat(e.target.value) / 100 },
                      })
                    }
                  />
                </div>
                <div>
                  <h4 className="font-medium text-orange-700">Subsequent Sale</h4>
                  <label className="block text-orange-700 mb-1">Seller (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                    value={config.subsequentSale.seller * 100}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        subsequentSale: { ...config.subsequentSale, seller: parseFloat(e.target.value) / 100 },
                      })
                    }
                  />
                  <label className="block text-orange-700 mb-1 mt-2">Passive (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                    value={config.subsequentSale.passive * 100}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        subsequentSale: { ...config.subsequentSale, passive: parseFloat(e.target.value) / 100 },
                      })
                    }
                  />
                  <label className="block text-orange-700 mb-1 mt-2">Super Passive (%)</label>
                  <input
                    type="number"
                    className="w-full p-2 rounded-lg border border-orange-200 text-orange-700"
                    value={config.subsequentSale.superPassive * 100}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        subsequentSale: { ...config.subsequentSale, superPassive: parseFloat(e.target.value) / 100 },
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  className="btn bg-orange-500 text-white hover:bg-orange-600"
                  onClick={handleConfigUpdate}
                >
                  Save Changes
                </button>
                <button
                  className="btn bg-yellow-400 text-orange-800 hover:bg-yellow-300"
                  onClick={handleConfigReset}
                >
                  Reset to Default
                </button>
                <button
                  className="btn bg-amber-200 text-orange-700 hover:bg-amber-300"
                  onClick={() => setShowReferralModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
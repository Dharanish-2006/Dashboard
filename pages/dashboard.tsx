import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import UserTable from '@/components/UserTable';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
};

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const submittedUsers = JSON.parse(localStorage.getItem('submittedUsers') || '[]');
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const combined = [...res.data, ...submittedUsers];
        setUsers(combined);
      })
      .catch(() => setError('Failed to fetch users'))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.address.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-2">
            📊 <span>User Dashboard</span>
          </h1>
          <ThemeToggle />
        </div>

        {/* Search + Add User */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            placeholder="🔍 Search by name or city"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <Link href="/dashboard-add" passHref>
            <span className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg font-semibold shadow inline-block">
              ➕ Add User
            </span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md ring-1 ring-gray-300 dark:ring-gray-700 transition-all">
          {loading && (
            <div className="text-center py-8 animate-pulse text-blue-600 font-medium text-lg">
              🔄 Loading users...
            </div>
          )}
          {error && (
            <div className="text-center py-4 text-red-600 font-semibold">
              ❌ {error}
            </div>
          )}
          {!loading && !error && (
            <span className="flex flex-col transition-opacity duration-300 ease-in">
              <UserTable users={filteredUsers} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

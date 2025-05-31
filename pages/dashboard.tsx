// pages/dashboard.tsx
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
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch(() => setError('Failed to fetch users'))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.address.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ThemeToggle />
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search by name or city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800"
        />
        <Link href="/dashboard/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add User
        </Link>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <UserTable users={filteredUsers} />}
    </div>
  );
}

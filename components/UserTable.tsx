// components/UserTable.tsx
import { Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
};

export default function UserTable({ users }: { users: User[] }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl p-6 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition duration-200 h-full flex flex-col"
          >
            {/* User header with avatar */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.name
                )}&background=random&rounded=true&bold=true`}
                alt={user.name}
                className="w-14 h-14 rounded-full border-2 border-blue-400 shadow"
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                  {user.name}
                </h2>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{user.address.city}</span>
                </div>
              </div>
            </div>

            {/* User details */}
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                <span className="truncate">{user.phone}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-auto flex justify-end space-x-2">
              <button className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {users.length === 0 && (
        <div className="text-center py-12 col-span-full">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            No users found
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try adding a new user or adjusting your search
          </p>
        </div>
      )}
    </div>
  );
}
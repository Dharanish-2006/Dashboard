// components/UserTable.tsx
import { Mail, Phone, MapPin, Trash2 } from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { city: string };
};

export default function UserTable({
  users,
  onDelete,
}: {
  users: User[];
  onDelete: (id: number) => void;
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl p-6 bg-white dark:bg-gray-800 shadow-md transition duration-300 h-full flex flex-col items-center text-center border border-transparent hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:animate-tilt"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&rounded=true&bold=true`}
              alt={user.name}
              className="w-20 h-20 rounded-full border-2 border-blue-400 shadow mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
              {user.name}
            </h2>
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{user.address.city}</span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300 mt-4 space-y-2">
              <div className="flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="w-4 h-4 mr-2 text-green-500" />
                <span>{user.phone}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center space-x-2">
              <button
                onClick={() => onDelete(user.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

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

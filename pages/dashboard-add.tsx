// pages/dashboard/add.tsx
import MultiStepForm from '@/components/MultiStepForm';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export default function AddUser() {
  return (
    <div className="min-h-screen p-6 dark:bg-gray-900 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add User</h1>
        <ThemeToggle />
      </div>
      <MultiStepForm />
      <Link href="/dashboard" className="mt-6 inline-block text-blue-500 underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Welcome Section */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900">
            {session ? `Welcome, ${session?.user?.name}!` : 'Welcome to AuthApp'}
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            {session
              ? 'Here’s a quick overview of your account.'
              : 'Please log in or register to access your dashboard.'}
          </p>
        </div>

        {/* Action Cards */}
        {session ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Profile
              </h2>
              <p className="text-gray-600">
                View and edit your personal details.
              </p>
              <Link
                href="/"
                className="block mt-4 text-blue-500 hover:underline"
              >
                Go to Profile
              </Link>
            </div>

            {/* Dashboard Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Dashboard
              </h2>
              <p className="text-gray-600">
                Get insights into your activity and stats.
              </p>
              <Link
                href="/"
                className="block mt-4 text-blue-500 hover:underline"
              >
                Go to Dashboard
              </Link>
            </div>

            {/* Settings Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Settings
              </h2>
              <p className="text-gray-600">
                Manage your account and preferences.
              </p>
              <Link
                href="/"
                className="block mt-4 text-blue-500 hover:underline"
              >
                Go to Settings
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Link
              href="/auth/signin"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-md ml-4"
            >
              Create Account
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 mt-16 absolute bottom-0 w-full h-[100px] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; AuthApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800">
                AuthApp
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {!session ? (
                <>
                  <Link
                    href="/auth/signin"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

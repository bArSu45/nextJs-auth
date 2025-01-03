'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" />
    <span className='ml-2'> Loading...</span>
    
  </div>
  )
}

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    setIsLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    });

    const data = await res.json();
    setIsLoading(false);
    if (!res.ok) {
      setError(data.error);
    } else {
      router.push('/auth/signin');
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="auth-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="auth-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="auth-input"
            />
          </div>

          <button type="submit" className="auth-button">
            {isLoading ? <LoadingSpinner /> : "Register"}
          </button>
          <Link href="/auth/signin" className="block text-center font-medium mb-1 text-gray-600"><p>Already Have a Account?</p></Link>
        </form>
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" />
    <span className='ml-2'> Loading...</span>
    
  </div>
  )
}
export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result.error) {
      setError(result.error);
      toast.error(result.error)
    } else {
      toast.success("User loggedin successfully!")
      setTimeout(() => {
        router.push('/');
      },3000)
    }
    setIsLoading(false);
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            {isLoading ? <LoadingSpinner /> : "Sign In"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="google-button"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
            </svg>
            Sign in with Google
          </button>
        </div>
        <Link href="/auth/register" className="block text-center font-medium text-gray-600 mt-5"><p>Create a Account?</p></Link>
      </div>
      <ToastContainer />
    </div>
  );
}

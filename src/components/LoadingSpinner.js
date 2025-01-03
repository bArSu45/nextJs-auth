'use client';

export default function LoadingSpinner() {
    return (
      <div className="flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" />
      <span className='ml-2'> Loading...</span>
      
    </div>
    )
  }
  
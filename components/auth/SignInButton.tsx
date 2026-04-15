'use client';

import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="animate-pulse h-10 w-24 bg-gray-200 rounded"></div>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user?.image && (
            <img 
              src={session.user.image} 
              alt={session.user.name || 'User'} 
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium">{session.user?.name}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Sign In with Google
    </button>
  );
}
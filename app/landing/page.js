"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    await gitHubSignIn();
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  return (
    <main className="min-h-screen bg-gray-300 p-6 text-center text-blue-900">
      <header className="w-full text-left pb-4 mb-6 border-b-4 border-blue-900">
        <h1 className="text-3xl font-bold text-left">Swift List</h1>
      </header>

      {!user && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Welcome to the Landing Page</h2>
          <p className="mb-4">Please sign in to continue.</p>

          <button
            onClick={handleSignIn}
            className="px-4 py-2 border-2 border-black rounded-xl hover:cursor-pointer hover:bg-gray-100"
          >
            Sign in with GitHub
          </button>
        </>
      )}

      {user && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Welcome, {user.email}!{user.displayName}</h2>
          <Link href="/landing/list-list">
            <button className="px-4 py-2 border-2 border-black rounded-xl hover:cursor-pointer hover:bg-gray-100 mt-4">
              Go to your Lists
            </button>
          </Link>

          <br />

          <button
            onClick={handleSignOut}
            className="px-4 py-2 border-2 border-black rounded-xl hover:cursor-pointer hover:bg-gray-100 mt-4"
          >
            Sign Out
          </button>
        </>
      )}
    </main>
  );
}

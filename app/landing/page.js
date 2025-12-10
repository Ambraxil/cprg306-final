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
    <main style={{ padding: "2rem", textAlign: "center" }}>
      {!user && (
        <>
          <h1>Welcome to the Landing Page</h1>
          <p>Please sign in to continue.</p>

          <button onClick={handleSignIn}>Sign in with GitHub</button>
        </>
      )}

      {user && (
        <>
          <h1>Welcome, {user.displayName}</h1>
          <p>Your email: {user.email}</p>

          <Link href="/landing/task-list">
            <button style={{ marginTop: "1rem" }}>Go to Task List</button>
          </Link>

          <br />

          <button style={{ marginTop: "1rem" }} onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      )}
    </main>
  );
}

'use client'

import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only run if user authentication data has loaded
    if (!userLoaded || !authLoaded) return;
    console.log(user);
    
    
    const syncUser = async () => {
      try {
        setIsLoading(true);
        const token = await getToken();
        
        if (!token) {
          throw new Error("Authentication token not available");
        }

        const res = await fetch("http://localhost:5000/api/users/sync", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            // firstName: user.firstName,
            // lastName: user.lastName,
          }),
        });

        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }

        const data = await res.json();
        console.log("User sync response:", data);
        
        router.push("/");
      } catch (err) {
        console.error("Error syncing user:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      syncUser();
    } else if (userLoaded) {
      // User is loaded but no user data exists (not logged in)
      router.push("/sign-in");
    }
  }, [user, userLoaded, authLoaded, getToken, router]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-red-500 mb-4">Error setting up your account: {error}</p>
        <button 
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to home
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <p className="text-lg mb-4">Setting up your account...</p>
      {isLoading && (
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      )}
    </div>
  );
}
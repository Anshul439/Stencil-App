'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { getToken } = useAuth();
const token = getToken();
console.log(token);


  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-800">
        <div className="text-xl font-bold text-indigo-400">Rangoli Stencil</div>
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Create Custom Rangoli Stencils
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Design beautiful, precise rangoli patterns with our easy-to-use editor and get them laser-cut for perfect results every time.
        </p>

        <div className="flex justify-center gap-4">
          <SignedOut>
            <SignUpButton forceRedirectUrl="/setup">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-md font-medium transition">
                Get Started - It's Free
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link 
              href="/" 
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-md font-medium transition"
            >
              Go to Dashboard
            </Link>
          </SignedIn>
          <Link 
            href="/gallery" 
            className="px-6 py-3 border border-gray-700 hover:bg-gray-800 rounded-md font-medium transition"
          >
            View Gallery
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🖌️",
              title: "Design",
              description: "Upload images or draw directly in our editor to create your perfect stencil design."
            },
            {
              icon: "🔍",
              title: "Validate",
              description: "Our system checks your design meets minimum thickness requirements for perfect results."
            },
            {
              icon: "✂️",
              title: "Order",
              description: "Get your custom stencil laser-cut and delivered to your doorstep."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 p-6 text-center text-gray-500">
        © {new Date().getFullYear()} Rangoli Stencil. All rights reserved.
      </footer>
    </main>
  );
}
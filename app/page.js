"use client";

import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push("/workspace"); // already signed in
    } else {
      router.push("/sign-in"); // go to sign in page
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold mb-4">Learn Anything. Anytime.</h1>

        <p className="text-lg text-gray-300 mb-8">
          A modern online learning platform where AI generates personalized
          courses tailored just for you.
        </p>

        <Button
          size="lg"
          className="text-lg px-8 py-6 rounded-xl"
          onClick={handleGetStarted}
        >
          Get Started →
        </Button>
      </div>

      {/* Optional footer */}
      <p className="absolute bottom-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} Your Learning Platform
      </p>
    </main>
  );
}

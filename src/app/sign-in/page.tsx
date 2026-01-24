'use client';


import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useStackApp, SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
    const app = useStackApp();

    return (
        <main className="min-h-screen bg-stone-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-24 pb-12">
                <div className="w-full max-w-md p-8">
                    <div className="mb-8 text-center text-stone-900">
                        <h1 className="text-4xl font-serif mb-2">Sign In</h1>
                        <p className="text-stone-500 font-sans tracking-wide">Access your exclusive account</p>
                    </div>
                    {/* Stack's Credential component handles Google/GitHub SSO if configured in dashboard */}
                    <div className="bg-white p-6 rounded-none shadow-sm border border-stone-200">
                        <SignIn />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

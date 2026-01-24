'use client';


import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useStackApp, SignUp } from "@stackframe/stack";
import Link from "next/link";

export default function SignUpPage() {
    const app = useStackApp();

    return (
        <main className="min-h-screen bg-stone-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center pt-24 pb-12">
                <div className="w-full max-w-md p-8">
                    <div className="mb-8 text-center text-stone-900">
                        <h1 className="text-4xl font-serif mb-2">Create Account</h1>
                        <p className="text-stone-500 font-sans tracking-wide">Join the Dior universe</p>
                    </div>
                    <div className="bg-white p-6 rounded-none shadow-sm border border-stone-200">
                        <SignUp />
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}

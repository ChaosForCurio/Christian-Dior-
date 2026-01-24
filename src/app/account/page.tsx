'use client';

import { useUser, useStackApp } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
    const user = useUser();
    const app = useStackApp();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            // Use window.location.href for potential external redirects
            window.location.href = app.urls.accountSettings;
        } else {
            router.push('/sign-in');
        }
    }, [user, app, router]);

    return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Redirecting to Profile...</p>
            </div>
        </div>
    );
}

'use client';

import { useStackApp, useUser } from "@stackframe/stack";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function CheckoutPage() {
    const app = useStackApp();
    const user = useUser();
    const [status, setStatus] = useState<'idle' | 'processing' | 'error'>('idle');

    const handleCheckout = async () => {
        setStatus('processing');
        try {
            // NOTE: Configure your products in the Stack Dashboard and use the relevant Price ID here.
            // If using generic Stripe, this integration requires the Stack billing configured.
            // Usually: app.checkout.open({ price: 'price_...' }) or similar.
            // Since we don't have a specific price ID, this is a placeholder connect.

            // Simulating checkout delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Redirect to profile/billing portal usually if checkout not explicitly set up
            if (app.urls.accountSettings) {
                window.location.href = app.urls.accountSettings;
            } else {
                console.warn("Account settings URL not available");
            }
            // For actual checkout:
            // await app.checkout.open({
            //   mode: 'payment',
            //   lineItems: [{ price: 'YOUR_PRICE_ID', quantity: 1 }],
            //   successUrl: window.location.origin + '/success',
            //   cancelUrl: window.location.origin + '/checkout',
            // });
        } catch (error) {
            console.error("Checkout initialization failed:", error);
            setStatus('error');
        } finally {
            setStatus('idle');
        }
    };

    return (
        <main className="min-h-screen bg-stone-50 text-stone-900">
            <Navbar />

            <div className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
                <motion.h1
                    className="text-5xl md:text-7xl font-serif mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Checkout
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Order Summary */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 border border-stone-200">
                            <h2 className="text-2xl font-serif mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center py-4 border-b border-stone-100">
                                    <span className="font-sans uppercase tracking-wide text-sm">Dior Book Tote</span>
                                    <span className="font-serif">€ 3,500.00</span>
                                </div>
                                <div className="flex justify-between items-center py-4 border-b border-stone-100">
                                    <span className="font-sans uppercase tracking-wide text-sm">Shipping</span>
                                    <span className="font-serif">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-center py-4 text-xl">
                                    <span className="font-serif">Total</span>
                                    <span className="font-serif">€ 3,500.00</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-stone-500 text-sm mb-8">
                                <ShieldCheck size={18} />
                                <span>Secure Checkout with Stripe</span>
                            </div>

                            {user ? (
                                <button
                                    onClick={handleCheckout}
                                    disabled={status === 'processing'}
                                    className="w-full bg-stone-900 text-white py-4 px-8 uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {status === 'processing' ? 'Processing...' : 'Proceed to Payment'}
                                    {status !== 'processing' && <ArrowRight size={16} />}
                                </button>
                            ) : (
                                <Link href="/sign-in" className="block w-full text-center bg-stone-900 text-white py-4 px-8 uppercase tracking-widest text-sm hover:bg-stone-800 transition-colors">
                                    Sign In to Checkout
                                </Link>
                            )}
                        </div>

                        <p className="text-xs text-stone-400 text-center">
                            By proceeding, you agree to our Terms of Service and Return Policy.
                        </p>
                    </div>

                    {/* Visual / Details */}
                    <div className="hidden lg:block bg-stone-200 h-[600px] relative overflow-hidden group">
                        {/* Placeholder for Product Image */}
                        <div className="absolute inset-0 flex items-center justify-center text-stone-400 font-serif text-3xl">
                            Product Visualization
                        </div>
                        {/* Can add a 3D Canvas here if desired */}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

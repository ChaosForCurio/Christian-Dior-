'use client';

import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";
import ProductShowcase from "@/components/ui/ProductShowcase";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <Footer />
    </main>
  );
}

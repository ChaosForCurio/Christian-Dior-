'use client';

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import ProductShowcase from "@/components/sections/ProductShowcase";

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

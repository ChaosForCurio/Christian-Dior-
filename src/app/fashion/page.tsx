import CategoryShowcase from "@/components/sections/CategoryShowcase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function FashionPage() {
    return (
        <main className="bg-white">
            <Navbar />
            <CategoryShowcase
                category="Fashion"
                description="Explore the pinnacle of elegance through our seasonal Ready-to-Wear collections, merging historical heritage with avant-garde vision."
            />
            <Footer />
        </main>
    );
}

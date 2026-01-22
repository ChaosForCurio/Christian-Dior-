import CategoryShowcase from "@/components/ui/CategoryShowcase";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

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

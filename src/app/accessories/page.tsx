import CategoryShowcase from "@/components/sections/CategoryShowcase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AccessoriesPage() {
    return (
        <main className="bg-white">
            <Navbar />
            <CategoryShowcase
                category="Accessories"
                description="The essential final touch. Discover our collection of signature bags, leather goods, and refined jewelry that define the Dior silhouette."
            />
            <Footer />
        </main>
    );
}

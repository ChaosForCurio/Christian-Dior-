import CategoryShowcase from "@/components/sections/CategoryShowcase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function HeritagePage() {
    return (
        <main className="bg-white">
            <Navbar />
            <CategoryShowcase
                category="Heritage"
                description="Journey through the archives of the House. Explore the legacy of Christian Dior and the iconic pieces that continue to inspire modern luxury."
            />
            <Footer />
        </main>
    );
}

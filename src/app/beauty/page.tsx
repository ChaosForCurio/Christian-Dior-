import CategoryShowcase from "@/components/ui/CategoryShowcase";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function BeautyPage() {
    return (
        <main className="bg-white">
            <Navbar />
            <CategoryShowcase
                category="Beauty"
                description="A symphony of Dior skincare excellence and makeup artistry, where every creation is designed to reveal and enhance your unique radiance."
            />
            <Footer />
        </main>
    );
}

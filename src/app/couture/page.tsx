import CategoryShowcase from "@/components/ui/CategoryShowcase";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function CouturePage() {
    return (
        <main className="bg-white">
            <Navbar />
            <CategoryShowcase
                category="Haute Couture"
                description="The ultimate expression of savoir-faire and boundless creativity. Experience the world of bespoke craftsmanship and architectural fashion."
            />
            <Footer />
        </main>
    );
}

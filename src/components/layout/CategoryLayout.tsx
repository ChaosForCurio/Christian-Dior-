import CategoryShowcase from "@/components/sections/CategoryShowcase";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface CategoryLayoutProps {
    category: string;
    description: string;
}

export default function CategoryLayout({ category, description }: CategoryLayoutProps) {
    return (
        <main className="bg-white">
            <Navbar />
            <CategoryShowcase
                category={category}
                description={description}
            />
            <Footer />
        </main>
    );
}

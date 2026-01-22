export default function Footer() {
    return (
        <footer className="w-full bg-stone-900 text-stone-400 py-12 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div>
                    <h2 className="font-serif text-2xl text-white tracking-widest mb-4">DIOR</h2>
                    <p className="text-xs uppercase tracking-wider opacity-60">
                        © {new Date().getFullYear()} Christian Dior Couture
                    </p>
                </div>

                <div className="flex gap-8 text-xs uppercase tracking-widest">
                    <a href="#" className="hover:text-white transition-colors">Legal</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    <a href="#" className="hover:text-white transition-colors">Careers</a>
                </div>
            </div>
        </footer>
    );
}

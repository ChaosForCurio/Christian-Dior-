import type { Metadata } from "next";
import { Mulish, Bodoni_Moda } from "next/font/google";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: 'swap',
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "DIOR | Luxury Shopping",
  description: "Experience the elegance of Dior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mulish.variable} ${bodoni.variable}`}>
      <body className="antialiased bg-stone-50 text-stone-900 selection:bg-stone-900 selection:text-white cursor-none">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

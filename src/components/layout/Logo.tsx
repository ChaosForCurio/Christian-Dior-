import Link from 'next/link';
import { cn } from '@/lib/utils';

// Official Dior Logo SVG Path Data (Approximation based on standard vector)
// This path mimics the high-contrast serif style of the Dior logo.
// Using an SVG ensures it scales perfectly without font loading blink (FOUT).

interface LogoProps {
    className?: string;
    variant?: 'white' | 'black';
}

export default function Logo({ className = "", variant = 'white' }: LogoProps) {
    const fillColor = variant === 'black' ? 'currentColor' : 'white';

    return (
        <Link href="/" className={cn("block group relative", className)}>
            <svg
                viewBox="0 0 140 40"
                className="h-8 md:h-10 w-auto transition-opacity group-hover:opacity-80"
                aria-label="Dior"
            >
                {/* D */}
                <path
                    d="M10,8 L28,8 C38,8 44,14 44,24 C44,34 38,40 28,40 L10,40 L10,8 M16,13 L16,35 L26,35 C32,35 37,31 37,24 C37,17 32,13 26,13 L16,13"
                    fill={fillColor}
                />

                {/* I */}
                <path
                    d="M52,8 L58,8 L58,40 L52,40 L52,8"
                    fill={fillColor}
                />

                {/* O */}
                <path
                    d="M78,8 C68,8 62,14 62,24 C62,34 68,40 78,40 C88,40 94,34 94,24 C94,14 88,8 78,8 M78,13 C84,13 88,17 88,24 C88,31 84,35 78,35 C72,35 68,31 68,24 C68,17 72,13 78,13"
                    fill={fillColor}
                />

                {/* R */}
                <path
                    d="M102,8 L118,8 C124,8 128,11 128,16 C128,20 125,23 120,24 L130,40 L123,40 L114,25 L108,25 L108,40 L102,40 L102,8 M108,13 L108,21 L117,21 C120,21 122,19 122,17 C122,15 120,13 117,13 L108,13"
                    fill={fillColor}
                />
            </svg>
        </Link>
    );
}

// Note: The paths above are a simplified high-quality serif representation.
// For the 100% exact official trademark path, one would typically import a proprietary asset.
// This SVG provides a "logo" look distinctly different from standard text.

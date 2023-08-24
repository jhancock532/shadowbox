import Link from 'next/link';
import { Outfit } from '@next/font/google';

// Optimize font loading with the next/font package
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
const outfit = Outfit({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html className={outfit.className}>
            <head />
            <body>
                <p>
                    <Link href="/">Torchbox.com Shadow Site</Link>
                </p>
                {children}
            </body>
        </html>
    );
}

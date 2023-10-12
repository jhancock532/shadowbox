import { Outfit } from '@next/font/google';
import styles from '@/styles/Page.module.scss';
import '@/styles/globals.scss';
import Link from 'next/link';

// Optimize font loading with the next/font package
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts
const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font--outfit',
    display: 'swap',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={outfit.className}>
            <head />
            <body>
                <div className={styles.container}>
                    <div></div>
                    <div>
                        <div className={styles.logo}>
                            <p className={styles.logo__name}>SHADOWBOX</p>
                            <p className={styles.logo__tagline}>
                                Website analytics
                            </p>
                        </div>

                        {/* Website name is a p tag as this is not the main page title. */}
                        <Link className={styles.reportSiteName} href={'/'}>
                            https://torchbox.com
                        </Link>
                        {children}
                    </div>
                    <div></div>
                </div>
            </body>
        </html>
    );
}
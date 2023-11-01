import { Outfit } from 'next/font/google';
import styles from '@/styles/Page.module.scss';
import '@/styles/globals.scss';
import Link from 'next/link';
import { DARK_COLORS, LIGHT_COLORS } from '@/utils/constants';
import { cookies } from 'next/headers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Optimize font loading with next/font
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
    const savedTheme = cookies().get('color-theme');
    const theme = savedTheme?.value || 'light';

    const themeColors = theme === 'light' ? LIGHT_COLORS : DARK_COLORS;

    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore:next-line
        <html lang="en" className={outfit.className} style={themeColors}>
            <head />
            <body>
                <div className={styles.container}>
                    <div></div>
                    <div>
                        <Header />
                        {/* Website name is a p tag as this is not the main page title. */}
                        <Link className={styles.reportSiteName} href={'/'}>
                            https://torchbox.com
                        </Link>
                        {children}
                    </div>
                    <div></div>
                </div>
            </body>
            <div className={styles.container}>
                <div></div>
                <Footer />
            </div>
        </html>
    );
}

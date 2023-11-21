import React from 'react';
import { cookies } from 'next/headers';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';
import styles from './Header.module.scss';

export const Header = () => {
    const savedTheme = cookies().get('color-theme');
    const theme = savedTheme?.value || 'light';

    return (
        <div className={styles.container}>
            <DarkModeToggle initialTheme={theme as 'light' | 'dark'} />
            <div className={styles.logo}>
                <p className={styles.logo__name}>SHADOWBOX</p>
                <p className={styles.logo__tagline}>Website analytics</p>
            </div>
        </div>
    );
};

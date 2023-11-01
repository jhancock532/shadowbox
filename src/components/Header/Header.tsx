'use client';

import React from 'react';
import Cookie from 'js-cookie';
import { DARK_COLORS, LIGHT_COLORS } from '@/utils/constants';
import styles from './Header.module.scss';
import { MoonIcon } from '../Icons/MoonIcon';
import { SunIcon } from '../Icons/SunIcon';

export const Header = () => {
    const [theme, setTheme] = React.useState('light');

    function handleClick() {
        const nextTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(nextTheme);

        Cookie.set('color-theme', nextTheme, {
            expires: 1000,
        });

        const root = document.documentElement;
        const colors = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;

        root.setAttribute('data-color-theme', nextTheme);
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }

    return (
        <div className={styles.container}>
            <button className={styles.themeButton} onClick={handleClick}>
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <div className={styles.logo}>
                <p className={styles.logo__name}>SHADOWBOX</p>
                <p className={styles.logo__tagline}>Website analytics</p>
            </div>
        </div>
    );
};

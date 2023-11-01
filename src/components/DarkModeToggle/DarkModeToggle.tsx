'use client';

import React from 'react';
import Cookie from 'js-cookie';
import { DARK_COLORS, LIGHT_COLORS } from '@/utils/constants';
import { MoonIcon, SunIcon } from '@/components/Icons';
import styles from './DarkModeToggle.module.scss';

type DarkModeToggleProps = {
    initialTheme: 'light' | 'dark';
};

const DarkModeToggle = ({ initialTheme }: DarkModeToggleProps) => {
    const [theme, setTheme] = React.useState(initialTheme);

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
        <button className={styles.button} onClick={handleClick}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
    );
};

export default DarkModeToggle;

import React from 'react';

// SVG patterns taken from https://gamut.codecademy.com/?path=/docs/atoms-patterns--pattern

type PatternProps = {
    className?: string;
    color?: string;
    pattern:
        | 'CheckerDense'
        | 'CheckerRegular'
        | 'DiagonalARegular'
        | 'DiagonalBLoose'
        | 'StripeRegular'
        | 'ExRegular';
};

export const Pattern: React.FC<PatternProps> = ({
    className,
    color,
    pattern,
}) => {
    return (
        <svg
            role="img"
            aria-hidden="true"
            height="100%"
            width="100%"
            className={className}
            style={{ color }}
        >
            {pattern === 'CheckerDense' && (
                <pattern
                    id="CheckerDense"
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="2"
                        y="2"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                </pattern>
            )}

            {pattern === 'DiagonalBLoose' && (
                <pattern
                    id="DiagonalBLoose"
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                >
                    <rect
                        y="15"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="1"
                        y="14"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="2"
                        y="13"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="3"
                        y="12"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="4"
                        y="11"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="5"
                        y="10"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="6"
                        y="9"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="7"
                        y="8"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="8"
                        y="7"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="9"
                        y="6"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="10"
                        y="5"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="11"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="12"
                        y="3"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="13"
                        y="2"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="14"
                        y="1"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="15"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                </pattern>
            )}

            {pattern === 'CheckerRegular' && (
                <pattern
                    id="CheckerRegular"
                    x="0"
                    y="0"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="4"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                </pattern>
            )}

            {pattern === 'DiagonalARegular' && (
                <pattern
                    id="DiagonalARegular"
                    x="0"
                    y="0"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                >
                    <rect width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="6"
                        y="2"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="5"
                        y="2"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="5"
                        y="3"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="4"
                        y="3"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect x="7" width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="7"
                        y="1"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="6"
                        y="1"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="3"
                        y="5"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="2"
                        y="5"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="2"
                        y="6"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="1"
                        y="6"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect y="7" width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="1"
                        y="7"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="4"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="3"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                </pattern>
            )}

            {pattern === 'StripeRegular' && (
                <pattern
                    id="StripeRegular"
                    x="0"
                    y="0"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                >
                    <rect x="1" width="1" height="1" fill="currentColor"></rect>
                    <rect width="1" height="1" fill="currentColor"></rect>
                    <rect x="2" width="1" height="1" fill="currentColor"></rect>
                    <rect x="3" width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="1"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect y="4" width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="2"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="3"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect x="5" width="1" height="1" fill="currentColor"></rect>
                    <rect x="4" width="1" height="1" fill="currentColor"></rect>
                    <rect x="6" width="1" height="1" fill="currentColor"></rect>
                    <rect x="7" width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="5"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="4"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="6"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect
                        x="7"
                        y="4"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                </pattern>
            )}

            {pattern === 'ExRegular' && (
                <pattern
                    id="ExRegular"
                    x="0"
                    y="0"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                >
                    <rect x="1" width="1" height="1" fill="currentColor"></rect>
                    <rect y="1" width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="1"
                        y="2"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                    <rect x="7" width="1" height="1" fill="currentColor"></rect>
                    <rect
                        x="7"
                        y="2"
                        width="1"
                        height="1"
                        fill="currentColor"
                    ></rect>
                </pattern>
            )}

            <rect width="100%" height="100%" fill={`url(#${pattern})`}></rect>
        </svg>
    );
};

// https://gamut.codecademy.com/?path=/docs/atoms-patterns--pattern

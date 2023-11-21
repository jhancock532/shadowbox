/** @type {import('next').NextConfig} */

const path = require('path');
const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        // allow all scss files access to these files
        includePaths: [path.join(__dirname, 'src/styles')],
        // Todo: this prepend trick isn't working in _mixins.scss or _typography.scss.
        prependData: `@use "sass:math"; @use "variables" as *; @use "mixins" as *; @use "typography" as *;`,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;

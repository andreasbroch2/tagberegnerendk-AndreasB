/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
    compiler: { styledComponents: true },
    experimental: {
        serverActions: true,
    },
};

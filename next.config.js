/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: { styledComponents: true },
    images: {
        domains: [
            'tagberegneren.ditsmartehjem.dk',
            'www.partner-ads.com',
        ],
    },
    async redirects() {
        return [
            {
                source: '/3byggetilbud',
                destination: 'https://www.partner-ads.com/dk/klikbanner.php?partnerid=44511&bannerid=25692&htmlurl=https://www.3byggetilbud.dk/tilbud/tagrenovering/',
                permanent: false,
            },
            {
                source: '/gratistagtjek',
                destination: 'https://www.partner-ads.com/dk/klikbanner.php?partnerid=44511&bannerid=102210&htmlurl=https://book.jydsktagteknik.dk/tagtjek/',
                permanent: false,
            }
        ]
    },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = (nextConfig);

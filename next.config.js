/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: { styledComponents: true },
    images: {
        domains: [
            'tagberegneren.ditsmartehjem.dk',
            'www.partner-ads.com',
            "img.youtube.com",
        ],
    },
    async redirects() {
        return [
            {
                source: '/3byggetilbud',
                destination: 'https://www.partner-ads.com/dk/klikbanner.php?partnerid=44511&bannerid=25692&htmlurl=https://www.3byggetilbud.dk/tilbud/tagrenovering/',
                permanent: true,
            },
            {
                source: '/gratistagtjek',
                destination: 'https://www.partner-ads.com/dk/klikbanner.php?partnerid=44511&bannerid=102210&htmlurl=https://book.jydsktagteknik.dk/tagtjek/',
                permanent: true,
            },
            {
                source: '/tagpap',
                destination: '/tagtyper/hvad-koster-tagpap-tag-guide',
                permanent: true,
            },
            {
                source: '/tagtyper/tagpap',
                destination: '/tagtyper/hvad-koster-tagpap-tag-guide',
                permanent: true,
            },
            {
                source: '/pris-pa-tagmaling',
                destination: '/pris-paa-tagmaling',
                permanent: true,
            },
            {
                source: '/tegltag',
                destination: '/tagtyper/hvad-koster-tegltag-guide',
                permanent: true,
            },
            {
                source: '/tagtyper/tegltag',
                destination: '/tagtyper/hvad-koster-tegltag-guide',
                permanent: true,
            },
            {
                source: '/eternit-tag',
                destination: '/tagtyper/hvad-koster-eternit-tag-guide',
                permanent: true,
            },
            {
                source: '/tagtyper/eternit-tag',
                destination: '/tagtyper/hvad-koster-eternit-tag-guide',
                permanent: true,
            },
            {
                source: '/gratis-tagberegner-beregn-pris-pa-dit-nye-tag',
                destination: '/',
                permanent: true,
            }
        ]
    },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = (nextConfig);

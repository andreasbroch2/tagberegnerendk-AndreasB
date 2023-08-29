/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
    compiler: { styledComponents: true },
    experimental: {
        serverActions: true,
    },
    async redirects() {
        return [
            {
                source: '/3byggetilbud',
                destination: 'https://www.partner-ads.com/dk/klikbanner.php?partnerid=44511&bannerid=25692&htmlurl=https://www.3byggetilbud.dk/tilbud/tagrenovering/',
                permanent: false,
            },
        ]
    },
};

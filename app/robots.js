export default function robots() {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/partner/",
            disallow: "/api/",
            disallow: "/sign-in/",
            disallow: "/sign-up/",
        },
        sitemap: "https://tagberegneren.dk/sitemap.xml",
    };
}

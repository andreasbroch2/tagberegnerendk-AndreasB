import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/goderaad",
        "/artikler",
        "/hurtigesvar",
        "/omos",
        "/artikler/[id]",
        "/api/auth/[...clerk]",
        "/api/",
        "/api/handle-buy-lead",
        "/artikler/(.*)", // Use glob patterns to match multiple routes
        "/pris/(.*)",
        "/beregning/(.*)",
        "/blivpartner",
        "/pris",
    ],
});

export const config = {
    //exclude api routes from being processed by this middleware
    api: {
        bodyParser: false,
    },
    matcher: ["/((?!.*\\..*|_next).*)", "/"],
};

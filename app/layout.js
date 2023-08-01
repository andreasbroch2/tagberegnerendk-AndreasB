import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import WebsiteHeader from "./_components/WebsiteHeader";
import WebsiteFooter from "./_components/WebsiteFooter";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import Head from "next/head";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "100", "200", "300", "400", "500", "700"],
    variable: "--font-poppins",
});

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="da-dk">
                <head>
                    <Script strategy="afterInteractive" id="gtm-script" dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WPWLFM6B');`}}></Script>
                </head>
                <body className={`${poppins.className}`}>
                    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WPWLFM6B"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                    <WebsiteHeader />
                    <main>{children}</main>
                    <WebsiteFooter />
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}

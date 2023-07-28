import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import WebsiteHeader from "./_components/WebsiteHeader";
import WebsiteFooter from "./_components/WebsiteFooter";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import TagManager from 'react-gtm-module';


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "100", "200", "300", "400", "500", "700"],
    variable: "--font-poppins",
});

export default function RootLayout({ children }) {
    useEffect(() => {
        TagManager.initialize({ gtmId: 'GTM-WPWLFM6B' });
      }, []);
    return (
        <ClerkProvider>
            <html lang="da-dk">
                <body className={`${poppins.className}`}>
                    <WebsiteHeader />
                    <main>{children}</main>
                    <WebsiteFooter />
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}

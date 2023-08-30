import "./../styles/globals.css";
import WebsiteHeader from "./_components/WebsiteHeader";
import WebsiteFooter from "./_components/WebsiteFooter";
import { Poppins } from "next/font/google";
import Providers from './providers'

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "100", "200", "300", "400", "500", "700"],
    variable: "--font-poppins",
});

export default function RootLayout({ children }) {
    return (
        <Providers>
            <html lang="da-dk">
                <body className={`${poppins.className}`}>
                    <WebsiteHeader />
                    <main>{children}</main>
                    <WebsiteFooter />
                </body>
            </html>
        </Providers>
    );
}

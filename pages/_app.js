import "../styles/globals.css";
import WebsiteHeader from "./../components/WebsiteHeader";
import WebsiteFooter from "./../components/WebsiteFooter";
import Script from "next/script";
import { Poppins } from "next/font/google";
import NextApp from 'next/app';


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "100", "200", "300", "400", "500", "700"],
    variable: "--font-poppins",
});

function MyApp({ Component, pageProps, }) {
    return (
        <div className={`${poppins.className}`}>
            <WebsiteHeader />
            <main>
                <Component {...pageProps} />
            </main>
            <WebsiteFooter />
        </div>
    );
}

export default MyApp
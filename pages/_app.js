import "../styles/globals.css";
import dynamic from 'next/dynamic'
import WebsiteFooter from "./../components/WebsiteFooter";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Providers from '../lib/providers'

const WebsiteHeader = dynamic(() => import('./../components/WebsiteHeader.jsx'), {
    loading: () => <p>Loading...</p>,
})



const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "100", "200", "300", "400", "500", "700"],
    variable: "--font-poppins",
});

function MyApp({ Component, pageProps, }) {
    return (
        <Providers>
            <div className={`${poppins.className}`}>
                <GoogleAnalytics trackPageViews />
                <WebsiteHeader />
                <main>
                    <Component {...pageProps} />
                </main>
                <WebsiteFooter />
            </div>
        </Providers>
    );
}

export default MyApp
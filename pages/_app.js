import "../styles/globals.scss";
import dynamic from 'next/dynamic'
import WebsiteFooter from "./../components/WebsiteFooter";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { SearchProvider } from '../lib/use-search';
import Link from 'next/link';
import Image from 'next/image';
import searchIcon from '../assets/search.svg';
import Script from "next/script.js";

const WebsiteHeader = dynamic(() => import('./../components/WebsiteHeader.jsx'), {
    loading: () =>
        <header>
            <div className="bg-mygreen text-white text-center w-full  text-sm lg:text-lg font-medium py-2 px-2">
                <p>Præcis prisberegning på nyt tag og tagmaling</p>
            </div>
            <div className="container px-3 lg:px-0">
                <div className="mt-5 flex flex-wrap justify-between">
                    <Link href="/" className="flex my-auto">
                        <h4 className="text-xl md:text-3xl font-semibold flex gap-2">TagBeregneren.dk</h4>
                    </Link>
                    <ul className="ml-10 hidden flex-wrap gap-5 items-center justify-center lg:flex font-light">
                        <li className="mr-4 text-xl font-semibold hover:underline md:mr-6">
                            <Link href="/hvad-koster-det-at-skifte-tag">Nyt Tag</Link>
                        </li>
                    </ul>
                    <button className="lg:hidden mobileMenu">
                        <div className="space-y-2">
                            <div className="w-8 h-0.5 bg-gray-500"></div>
                            <div className="w-8 h-0.5 bg-gray-600"></div>
                            <div className="w-8 h-0.5 bg-gray-600"></div>
                        </div>
                    </button>
                    <div className={`mobile navSearch`}>
                        <button className='noShadow'>
                            <span className="sr-only">Toggle Search</span>
                            <Image
                                src={searchIcon}
                                alt="Search Icon"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </header>,
    ssr: false
})

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "300", "400", "500"],
    variable: "--font-poppins",
});

function MyApp({ Component, pageProps, }) {
    if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const gclid = urlParams.get("gclid");
        if (gclid) {
            localStorage.setItem("gclid", gclid);
        }
        // Also save utm source and medium
        const utmSource = urlParams.get("utm_source");
        const utmMedium = urlParams.get("utm_medium");
        if (utmSource) {
            localStorage.setItem("utm_source", utmSource);
        }
        if (utmMedium) {
            localStorage.setItem("utm_medium", utmMedium);
        }
    }
    return (
            <SearchProvider>
                <div className={`${poppins.className}`}>
                    <GoogleAnalytics 
                    trackPageViews
                    strategy="lazyOnload"
                     />
                    <WebsiteHeader />
                    <main>
                        <Component {...pageProps} />
                    </main>
                    <WebsiteFooter />
                </div>
            </SearchProvider>
    );
}

export default MyApp
import { Poppins } from "next/font/google";
import GodeRåd from "./GodeRåd";
import TitleSection from "./TitleSection";
import DerforSection from "./DerforSection";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "100", "200", "300", "400", "500", "700"],
    variable: "--font-poppins",
});

export default function LandingPage() {
    return (
        <>
            <main className={`${poppins.className}`}>
                {/* Render TitleSection-komponenten */}
                <TitleSection home={true} />
                {/* Render DerforSection-komponenten */}
                <DerforSection />
                {/* Render GodeRåd-komponenten */}
                <GodeRåd />
                {/* Render SenesteArtikler-komponenten */}
                {/* <SenesteArtikler home={true} /> */}
                {/* Render Faq-komponenten */}
                {/* <Faq home={true} /> */}
                {/*  <FindHåndværker /> */}
            </main>
        </>
    );
}

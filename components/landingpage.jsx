import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
const GodeRåd = dynamic(() => import("./GodeRåd"));
import TitleSection from "./TitleSection";
import { useEffect, useState } from "react";
const DerforSection = dynamic(() => import("./DerforSection"));

// Definér fontindstillinger for Poppins-fonten
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "100", "200", "300", "400", "500", "700"],
    variable: "--font-poppins",
});

export default function LandingPage() {
    const [adresse, setAdresse] = useState("");

    // Render hjemmesiden
    return (
        <>
            <main className={`${poppins.className}`}>
                {/* Render TitleSection-komponenten */}
                <TitleSection setAdresse={setAdresse} home={true} />

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

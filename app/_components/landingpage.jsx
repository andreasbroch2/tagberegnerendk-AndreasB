// Importér nødvendige moduler og komponenter
import { Poppins } from "next/font/google";
import GodeRåd from "../_components/GodeRåd";
import DerforSection from "../_components/DerforSection";
import TitleSection from "../_components/TitleSection";

// Definér fontindstillinger for Poppins-fonten
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600", "100", "200", "300", "400", "500", "700"],
    variable: "--font-poppins",
});

export default function LandingPage() {

    // Render hjemmesiden
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

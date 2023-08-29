import GodeRåd from "./GodeRåd";
import TitleSection from "./TitleSection";
import DerforSection from "./DerforSection";


export default function LandingPage() {
    return (
        <>
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
        </>
    );
}

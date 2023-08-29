import LandingPage from "./../components/landingpage";
import Seo from "./../components/Seo";

export default function Home() {
    return (
        <>
        <Seo title="Gratis Tagberegner - Beregn pris på dit nye tag" description="Udregn gratis og hurtigt en pris på dit nye tag. Indtast blot din adresse." canonical="https://tagberegneren.dk" />
        <LandingPage home={true} />
        </>
    );
}

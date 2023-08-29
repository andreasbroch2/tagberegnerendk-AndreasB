import LandingPage from "./../components/landingpage";
import Seo from "./../components/Seo";

export default function Home() {
    return (
        <>
        <Seo title="Forside" description="Udregn gratis og hurtigt en pris på dit nye tag. Indtast blot din adresse." canonical="https://tagberegneren.dk/" />
        <LandingPage home={true} />
        </>
    );
}

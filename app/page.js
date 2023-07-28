import LandingPage from "./_components/landingpage";

export const metadata = {
    title: "Pris på tag og tagmaling på 30 sekunder",
    description:
        "Få en hurtig og nøjagtig prisberegning på nyt tag. Tagberegneren beregner en nøjagtig pris på dit nye tag eller tagmaling.",
};

// Eksporter hovedkomponenten for hjemmesiden
export default function Home() {
    return <LandingPage home={true} />;
}

import FaqContainer from "../components/FaqContainerPage";
import Seo from "./../components/Seo";

export default function FAQ() {
    return (
        <>
            <Seo
                title="Hurtige svar på ofte stillede spørgsmål"
                description="Her kan du finde svar på de mest almindelige spørgsmål omkring Tagberegneren.dk"
                canonical="https://tagberegneren.dk/hurtigesvar"
            />
            <section>
                <div className="container">
                    <FaqContainer />
                </div>
            </section>
        </>
    );
}

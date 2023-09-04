import FaqContainer from "../components/FaqContainerPage";
import Seo from "./../components/Seo";

export default function FAQ() {
    return (
        <>
            <Seo
                title="Hurtige svar på ofte stillede spørgsmål"
                description="Her kan du finde svar på de mest almindelige spørgsmål omkring Tagberegneren.dk"
                canonical="https://www.tagberegneren.dk/hurtigesvar"
            />
            <section>
                <div className="container">
                    <h1>Hurtige svar</h1>
                    <FaqContainer />
                </div>
            </section>
        </>
    );
}

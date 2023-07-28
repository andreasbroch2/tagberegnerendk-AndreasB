import FaqContainer from "../_components/FaqContainerPage";

export const metadata = {
    title: "Ofte stillede spørgsmål om tagrenovering, nyt tag og tagmaling - Få svar her",
    description:
        "Få svar på dine spørgsmål om tagrenovering, nyt tag og tagmaling i vores FAQ-sektion. Få den nødvendige viden til dit tagprojekt.",
};

export default function FAQ() {
    return (
        <section>
            <div className="container">
                <FaqContainer />
            </div>
        </section>
    );
}

import Seo from "./../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import teglTag from "../../assets/tegltag.jpg"

export default function Page(props) {
    const mainEntity = [
        {
            questionName: "Hvad koster et nyt tegltag per m2?",
            acceptedAnswerText: "Prisen på et nyt tegltag per m2 afhænger af flere faktorer, såsom tagets størrelse, form, farve, kvalitet og montering. Som udgangspunkt kan du budgettere med en pris på mellem 1.200-2.100 kroner pr. kvadratmeter. Du kan også bruge en prisberegner for at få et mere præcist estimat",
        },
        {
            questionName: "Hvad er fordelene ved et tegltag?",
            acceptedAnswerText: "Et tegltag har mange fordele, såsom lang levetid (op til 50-70 år), miljøvenlighed, farvestabilitet, lav vedligeholdelse, storm- og brandsikkerhed og beskyttelse mod vejr og vind.",
        },
        {
            questionName: "Hvad er forskellen på falstagsten og vingetagsten?",
            acceptedAnswerText: "Falstagsten og vingetagsten er to typer af teglsten, som har forskellige udseender og egenskaber. Falstagsten har en glat overflade og en afrundet kant, mens vingetagsten har en ru overflade og en skarp kant. Falstagsten er mere traditionelle og klassiske, mens vingetagsten er mere moderne og elegante.",
        },
        {
            questionName: "Hvordan vedligeholder man et tegltag?",
            acceptedAnswerText: "Et tegltag kræver meget lidt vedligeholdelse, men det er stadig vigtigt at tjekke taget regelmæssigt for eventuelle skader eller utætheder. Hvis du opdager revner, skår eller mos på tagstenene, bør du kontakte en professionel taglægger for at få dem repareret eller udskiftet. Du bør også rense tagrenderne for blade og skidt mindst to gange om året.",
        },
        {
            questionName: "Hvornår skal man skifte et tegltag?",
            acceptedAnswerText: "Det kan være svært at sige præcist, hvornår et tegltag skal skiftes, da det afhænger af tagets tilstand og alder. Generelt kan man sige, at hvis taget er over 40 år gammelt, bør man overveje at få det undersøgt af en fagmand for at vurdere, om det er tid til et nyt tag. Nogle tegn på, at taget er slidt eller beskadiget, er f.eks. utætte tagsten, løse eller manglende lægter, fugt eller skimmel i loftet eller på væggene.",
        },
    ]
    return (
        <>
            <Seo
                title="Hvad koster et nyt tegltag? Få svar på det og meget mere i denne artikel"
                description="Tegltag er en af de mest populære tagtyper i Danmark, og det er der en god grund til. Her kan du læse mere om tegltag, og hvad det koster."
                canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-tegltag-guide"
                type="article"
                props={props.data}
            />
            <section className="blog-section">
                <TagTyperLayout props={props.data} image={teglTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-tegltag-guide" mainEntity={mainEntity}>
                    {props.data.content}
                </TagTyperLayout>
            </section>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('tegltag');
    return {
        props: { data },
    };
}

import Seo from "../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import eternitTag from "../../assets/eternittag.jpg"
import CleanLinks from "../../components/CleanLinks";

export default function Page(props) {
    const mainEntity = [
        {
            questionName: "Hvad er eternit tag?",
            acceptedAnswerText: "Eternit tag er en type tagbelægning, som består af fibercement, et materiale lavet af cement, sand og fibre. Eternit tag har mange fordele, såsom lav pris, nem montering, lang holdbarhed, god isoleringsevne, brandhæmmende virkning og miljøvenlighed.",
        },
        {
            questionName: "Hvilke typer af eternit tag findes der?",
            acceptedAnswerText: "Der findes tre hovedtyper af eternit tag: bølgeeternit, eternitskifer og toscana. Bølgeeternit er den mest udbredte type, som har en bølget form og en glat overflade. Eternitskifer er en type, som ligner naturskifer i udseende og har en ru overflade. Toscana er en type, som har et middelhavsinspireret design og en glat overflade.",
        },
        {
            questionName: "Hvad koster et nyt eternit tag pr. m2?",
            acceptedAnswerText: "Prisen på et nyt eternit tag pr. m2 afhænger af flere faktorer, såsom typen af eternit tag, undertagets tilstand, tagets størrelse og form, monteringsomkostninger og eventuelle ekstra tilbehør som ovenlysvinduer eller skorstene. Som udgangspunkt kan du budgettere med en pris på mellem 650-1200 kroner pr. m2 inklusive montering og moms. Du kan også bruge en prisberegner for at få et mere præcist estimat.",
        },
        {
            questionName: "Hvordan vedligeholder man et eternit tag?",
            acceptedAnswerText: "Et eternit tag kræver ikke meget vedligeholdelse, men det er stadig vigtigt at tjekke taget regelmæssigt for eventuelle skader eller utætheder. Hvis du opdager revner, huller eller mos på tagpladerne, bør du kontakte en professionel taglægger for at få dem repareret eller udskiftet. Du bør også rense tagrenderne for blade og skidt mindst to gange om året.",
        },
        {
            questionName: "Hvornår skal man skifte et eternit tag?",
            acceptedAnswerText: "Det kan være svært at sige præcist, hvornår et eternit tag skal skiftes, da det afhænger af tagets tilstand og alder. Generelt kan man sige, at hvis taget er over 40 år gammelt, bør man overveje at få det undersøgt af en fagmand for at vurdere, om det er tid til et nyt tag. Nogle tegn på, at taget er slidt eller beskadiget, er f.eks. utætte tagplader, løse eller manglende lægter, fugt eller skimmel i loftet eller på væggene.",
        },
    ]
    return (
        <>
            <Seo
            title="Hvad koster et nyt eternit tag? Få svar på det og meget mere i denne artikel"
            description="Eternit er en af de mest populære tagtyper i Danmark, og det er der en god grund til. Her kan du læse mere om eternit, og hvad det koster."
            canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-eternit-tag-guide"
            type="article"
            props={props.data}
            />
            <div className="blog-section">
                <TagTyperLayout props={props.data} image={eternitTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-eternit-tag-guide" mainEntity={mainEntity} cleanElement={props.cleanElement}>
                    {props.cleanElement}
                </TagTyperLayout>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('eternit-tag');
    var cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement},
    };
}

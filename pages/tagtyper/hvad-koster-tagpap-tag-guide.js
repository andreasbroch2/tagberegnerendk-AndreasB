import Seo from "../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import tagPapTag from "../../assets/tagpap-tag.png"
import CleanLinks from "../../components/CleanLinks";

export default function Page(props) {
    const mainEntity = [
        {
            questionName: "Hvad koster et nyt tagpap tag pr. m2?",
            acceptedAnswerText: "Prisen på et nyt tagpap tag pr. m2 afhænger af flere faktorer, såsom tagets størrelse, form, kvalitet, montering og antal lag. Hvis du får en professionel til at montere det, kan du forvente en pris på mellem 1.000-1.500 kroner pr. m2. Hvis du selv lægger tagpappet, kan du spare penge og købe det for ca. 400-600 kroner pr. m2",
        },
        {
            questionName: "Hvad er fordelene ved et tagpap tag?",
            acceptedAnswerText: "Et tagpap tag har mange fordele, såsom lav pris, nem montering, lang holdbarhed (op til 50 år), god isoleringsevne, modstandsdygtighed over for vind og vejr og mulighed for at vælge mellem forskellige farver og typer.",
        },
        {
            questionName: "Hvad er forskellen på 1-lags og 2-lags tagpap?",
            acceptedAnswerText: "1-lags og 2-lags tagpap er to typer af tagpap, som har forskellige egenskaber og krav til underlaget. 1-lags tagpap består af en enkelt bane af polyesterfibre med bitumen (et bindestof), som brændes fast på en plade eller bræddebeklædning oven på tagspærerne. 2-lags tagpap består af to baner af polyesterfibre med bitumen, som lægges oven på hinanden med en overlapning på ca. 10 cm1. 2-lags tagpap er mere slidstærkt og tæt end 1-lags tagpap, men kræver også et mere stabilt og plant underlag.",
        },
        {
            questionName: "Hvordan vedligeholder man et tagpap tag?",
            acceptedAnswerText: "Et tagpap tag kræver ikke meget vedligeholdelse, men det er stadig vigtigt at tjekke taget regelmæssigt for eventuelle skader eller utætheder. Hvis du opdager revner, huller eller mos på tagpappet, bør du kontakte en professionel taglægger for at få det repareret eller udskiftet. Du bør også rense tagrenderne for blade og skidt mindst to gange om året.",
        },
        {
            questionName: "Hvornår skal man skifte et tagpap tag?",
            acceptedAnswerText: "Det kan være svært at sige præcist, hvornår et tagpap tag skal skiftes, da det afhænger af tagets tilstand og alder. Generelt kan man sige, at hvis taget er over 40 år gammelt, bør man overveje at få det undersøgt af en fagmand for at vurdere, om det er tid til et nyt tag. Nogle tegn på, at taget er slidt eller beskadiget, er f.eks. utætte tagsten, løse eller manglende lægter, fugt eller skimmel i loftet eller på væggene.",
        },
    ]
    return (
        <>
            <Seo
            title="Hvad koster et nyt tagpap tag? Få svar på det og meget mere i denne artikel"
            description="Tagpap er en af de mest populære tagtyper i Danmark, og det er der en god grund til. Her kan du læse mere om tagpap, og hvad det koster."
            canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-tagpap-tag-guide"
            type="article"
            props={props.data}
            />
            <div className="blog-section">
                <TagTyperLayout props={props.data} image={tagPapTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-tagpap-tag-guide" mainEntity={mainEntity} cleanElement={props.cleanElement}>
                    {props.cleanElement}
                </TagTyperLayout>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('tagpap');
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement},
    };
}

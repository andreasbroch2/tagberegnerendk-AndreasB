import Seo from "./../components/Seo";
import { getSinglePost } from "../lib/wordpress";
import TitleSection from "../components/TitleSection";

export default function PrisPaaTag(props) {
    return (
        <>
            <Seo 
            title="Hvad koster det at skifte tag? - Din guide til pris på nyt tag i 2023" 
            description="At få et nyt tag på dit hus kan være en stor investering, så det er vigtigt at forstå omkostningerne ved et nyt tag, inden du begynder projektet. Prisen for et nyt tag kan variere meget afhængigt af flere faktorer" 
            canonical="https://tagberegneren.dk/hvad-koster-det-at-skifte-tag" />
            <TitleSection title="Hvad koster det at skifte tag?"/>
            <section className="blog-section">
                <div className="container" dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
            </section>
        </>
    );
}

export const getStaticProps = async () => {
    const data = await getSinglePost('hvad-koster-det-at-skifte-tag');
    return {
        props: { data }
    }
}
import Seo from "./../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";

export default function Page(props) {
    return (
        <>
            <Seo
            title="Hvad koster et nyt tegltag? Få svar på det og meget mere i denne artikel"
            description="Tegltag er en af de mest populære tagtyper i Danmark, og det er der en god grund til. Her kan du læse mere om tegltag, og hvad det koster."
            canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-tegltag-guide"
            />
            <section className="blog-section">
                <div className="container" dangerouslySetInnerHTML={{ __html: props.data?.content }}></div>
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

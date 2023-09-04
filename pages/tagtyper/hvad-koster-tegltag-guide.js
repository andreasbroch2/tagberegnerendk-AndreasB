import Seo from "./../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import teglTag from "../../assets/tegltag.jpg"

export default function Page(props) {
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
                <TagTyperLayout props={props.data} image={teglTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-tegltag-guide">
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

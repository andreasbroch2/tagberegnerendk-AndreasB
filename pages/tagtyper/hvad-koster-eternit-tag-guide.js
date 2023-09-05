import Seo from "../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import eternitTag from "../../assets/eternittag.jpg"

export default function Page(props) {
    return (
        <>
            <Seo
            title="Hvad koster et nyt eternit tag? Få svar på det og meget mere i denne artikel"
            description="Eternit er en af de mest populære tagtyper i Danmark, og det er der en god grund til. Her kan du læse mere om eternit, og hvad det koster."
            canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-eternit-tag-guide"
            type="article"
            props={props.data}
            />
            <section className="blog-section">
                <TagTyperLayout props={props.data} image={eternitTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-eternit-tag-guide">
                    {props.data.content}
                </TagTyperLayout>
            </section>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('eternit-tag');
    return {
        props: { data },
    };
}

import Seo from "../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import tagPapTag from "../../assets/tagpap-tag.png"

export default function Page(props) {
    return (
        <>
            <Seo
            title="Hvad koster et nyt tagpap tag? Få svar på det og meget mere i denne artikel"
            description="Tagpap er en af de mest populære tagtyper i Danmark, og det er der en god grund til. Her kan du læse mere om tagpap, og hvad det koster."
            canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-tagpap-tag-guide"
            type="article"
            props={props.data}
            />
            <section className="blog-section">
                <TagTyperLayout props={props.data} image={tagPapTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-tagpap-tag-guide">
                    {props.data.content}
                </TagTyperLayout>
            </section>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('tagpap');
    return {
        props: { data },
    };
}

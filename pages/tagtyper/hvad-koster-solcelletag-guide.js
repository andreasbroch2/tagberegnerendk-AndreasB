import Seo from "./../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import solcelleTag from "../../assets/solcelletag.png"

export default function Page(props) {
    return (
        <>
            <Seo
                title="Hvad koster et nyt solcelletag? Få svar på det og meget mere i denne artikel"
                description="Solcelletag er en af de mest populære tagtyper i Danmark, og det er der en god grund til. Her kan du læse mere om solcelletag, og hvad det koster."
                canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-solcelletag-guide"
                type="article"
                props={props.data}
            />
            <div className="blog-section">
                <TagTyperLayout props={props.data} image={solcelleTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-solcelletag-guide">
                    {props.data.content}
                </TagTyperLayout>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('hvad-koster-solcelletag-guide');
    return {
        props: { data },
    };
}

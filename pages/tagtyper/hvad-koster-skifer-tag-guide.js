import Seo from "./../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import skiferTag from "../../assets/skifertag.jpg"
import CleanLinks from "../../components/CleanLinks";

export default function Page(props) {
    return (
        <>
            <Seo
                title="Hvad koster et nyt skifer tag? Få svar på det og meget mere i denne artikel"
                description="skifer tag er en af de mest populære tagtyper i Danmark, og det er der en god grund til. Her kan du læse mere om solcelletag, og hvad det koster."
                canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-skifer-tag-guide"
                type="article"
                props={props.data}
            />
            <div className="blog-section">
                <TagTyperLayout props={props.data} image={skiferTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-skifer-tag-guide" cleanElement={props.cleanElement}>
                    {props.cleanElement}
                </TagTyperLayout>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('hvad-koster-skifer-tag-guide');
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}

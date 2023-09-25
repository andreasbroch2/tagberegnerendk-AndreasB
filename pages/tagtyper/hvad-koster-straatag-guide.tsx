import Seo from '../../components/Seo';
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import straaTag from "../../assets/straatag.jpg"

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-straatag-guide");
    return {
        props: { data },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                title="Hvad koster et Stråtag? - Guide til priser på Stråtag"
                description="Hvad koster et Stråtag? - Guide til priser på Stråtag"
                canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-straatag-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={straaTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-straatag-guide">
                {props.data.content}
            </TagTyperLayout>
        </>
    );
}

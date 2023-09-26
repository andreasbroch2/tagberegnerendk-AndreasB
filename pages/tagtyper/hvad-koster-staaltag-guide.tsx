import Seo from '../../components/Seo';
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import staalTag from "../../assets/staaltag.png"
import CleanLinks from "../../components/CleanLinks";

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-staaltag-guide");
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                title="Hvad koster et ståltag? - Guide til priser på ståltag"
                description="Hvad koster et ståltag? - Guide til priser på ståltag"
                canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-staaltag-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={staalTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-staaltag-guide" cleanElement={props.cleanElement}>
                {props.cleanElement}
            </TagTyperLayout>
        </>
    );
}

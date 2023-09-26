import Seo from '../../components/Seo';
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import betonTegl from "../../assets/betontegl.jpeg"
import CleanLinks from "../../components/CleanLinks";

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-betontegl-tag-guide");
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-betontegl-tag-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={betonTegl} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-betontegl-tag-guide" cleanElement={props.cleanElement}>
                {props.cleanElement}
            </TagTyperLayout>
        </>
    );
}

import Seo from '../../components/Seo';
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import decraTag from "../../assets/dectratag.jpg"
import CleanLinks from "../../components/CleanLinks";

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-decratag-guide");
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-decratag-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={decraTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-decratag-guide" cleanElement={props.cleanElement}>
                {props.cleanElement}
            </TagTyperLayout>
        </>
    );
}

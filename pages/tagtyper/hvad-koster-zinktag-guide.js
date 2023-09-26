import Seo from "./../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import TagTyperLayout from "../../components/ArticleLayout";
import zinkTag from "../../assets/zinktag.jpg"
import CleanLinks from "../../components/CleanLinks";

export default function Page(props) {
    return (
        <>
            <Seo
                canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-zinktag-guide"
                type="article"
                props={props.data}
            />
            <div className="blog-section">
                <TagTyperLayout props={props.data} image={zinkTag} canonical="https://www.tagberegneren.dk/tagtyper/hvad-koster-zinktag-guide" cleanElement={props.cleanElement}>
                    {props.cleanElement}
                </TagTyperLayout>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('hvad-koster-zinktag-guide');
    var cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement},
    };
}

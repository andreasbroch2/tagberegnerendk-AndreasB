import Seo from '../components/Seo';
import { getSinglePost } from "../lib/wordpress";
import TagTyperLayout from "../components/ArticleLayout";
import solcelleTag from "../assets/solcelletag.png"
import CleanLinks from "../components/CleanLinks";

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-solceller-guide");
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                canonical="https://www.tagberegneren.dk/hvad-koster-solceller-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={solcelleTag} canonical="https://www.tagberegneren.dk/hvad-koster-solceller-guide" cleanElement={props.cleanElement}>
                {props.cleanElement}
            </TagTyperLayout>
        </>
    );
}

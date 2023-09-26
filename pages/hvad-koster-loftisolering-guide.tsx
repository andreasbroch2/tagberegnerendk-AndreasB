import Seo from '../components/Seo';
import { getSinglePost } from "../lib/wordpress";
import TagTyperLayout from "../components/ArticleLayout";
import loftIsolering from "../assets/loftisolering.jpg"
import CleanLinks from "../components/CleanLinks";

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-loftisolering-guide");
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                canonical="https://www.tagberegneren.dk/hvad-koster-loftisolering-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={loftIsolering} canonical="https://www.tagberegneren.dk/hvad-koster-loftisolering-guide" cleanElement={props.cleanElement}>
                {props.cleanElement}
            </TagTyperLayout>
        </>
    );
}

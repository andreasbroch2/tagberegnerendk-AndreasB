import Seo from '../components/Seo';
import { getSinglePost } from "../lib/wordpress";
import TagTyperLayout from "../components/ArticleLayout";
import tagIsolering from "../assets/tagisolering.jpg"
import CleanLinks from "../components/CleanLinks";

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-tagisolering-guide");
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                canonical="https://www.tagberegneren.dk/hvad-koster-tagisolering-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={tagIsolering} canonical="https://www.tagberegneren.dk/hvad-koster-tagisolering-guide" cleanElement={props.cleanElement}>
                {props.cleanElement}
            </TagTyperLayout>
        </>
    );
}

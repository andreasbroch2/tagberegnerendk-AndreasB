import Seo from '../components/Seo';
import { getSinglePost } from "../lib/wordpress";
import TagTyperLayout from "../components/ArticleLayout";
import algeRens from "../assets/algerens.jpg"
import CleanLinks from "../components/CleanLinks";

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-algerens-guide");
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                canonical="https://www.tagberegneren.dk/hvad-koster-algerens-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={algeRens} canonical="https://www.tagberegneren.dk/hvad-koster-algerens-guide" cleanElement={props.cleanElement}>
                {props.cleanElement}
            </TagTyperLayout>
        </>
    );
}

import Seo from '../components/Seo';
import { getSinglePost } from "../lib/wordpress";
import TagTyperLayout from "../components/ArticleLayout";
import tagRens from "../assets/tagrens.jpg"
import CleanLinks from "../components/CleanLinks";

export async function getStaticProps() {
    const data = await getSinglePost("hvad-koster-tagrensning-guide");
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement },
    };
}


export default function Page(props) {
    return (
        <>
            <Seo
                canonical="https://www.tagberegneren.dk/hvad-koster-tagrensning-guide"
                type="article"
                props={props.data}
            />
            <TagTyperLayout props={props.data} image={tagRens} canonical="https://www.tagberegneren.dk/hvad-koster-tagrensning-guide" cleanElement={props.cleanElement}>
                {props.cleanElement}
            </TagTyperLayout>
        </>
    );
}

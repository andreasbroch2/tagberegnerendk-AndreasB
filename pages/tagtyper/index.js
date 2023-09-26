import Seo from "./../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import { ArticleLayout } from "../../components/ArticleLayout";
import tagTyper from "../../assets/tagtyper.png"
import CleanLinks from "../../components/CleanLinks";

export default function Page(props) {
    return (
        <>
            <Seo
                title="Bliv klogere på de forskellige typer af tag. Din guide til tagtyper i 2023"
                description="Der findes mange forskellige typer af tag, og det kan være svært at finde rundt i. Her kan du læse mere om de forskellige tagtyper, og hvad der kendetegner dem."
                canonical="https://www.tagberegneren.dk/tagtyper"
            />
            <div className="blog-section">
                <ArticleLayout props={props.data} image={tagTyper} canonical="https://www.tagberegneren.dk/tagtyper" cleanElement={props.cleanElement}>
                    {props.cleanElement}
                </ArticleLayout>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('tagtyper');
    var cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement},
    };
}

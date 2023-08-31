import Seo from "./../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";

export default function Page(props) {
    return (
        <>
            <Seo
                title="Lær mere om alle de forskellige typer af tag her. Din guide til tagtyper i 2023"
                description="Der findes mange forskellige typer af tag, og det kan være svært at finde rundt i. Her kan du læse mere om de forskellige tagtyper, og hvad der kendetegner dem."
                canonical="https://tagberegneren.dk/tagtyper"
            />
            <section className="blog-section">
                <div className="container" dangerouslySetInnerHTML={{ __html: props.data?.content }}></div>
            </section>
        </>
    )
}

export async function getStaticProps() {
    const data = await getSinglePost('tagtyper');
    return {
        props: { data },
    };
}

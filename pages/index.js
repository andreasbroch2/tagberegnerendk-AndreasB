import LandingPage from "./../components/landingpage";
import Seo from "./../components/Seo";
import { getSinglePost } from "@/app/utils/wordpress";

export default function Home(props) {
    return (
        <>
            <Seo title="Gratis Tagberegner - Beregn pris på dit nye tag" description="Udregn gratis og hurtigt en pris på dit nye tag. Indtast blot din adresse." canonical="https://tagberegneren.dk" />
            <LandingPage home={true} />
            <section className="blog-section">
                <div className="container" dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
            </section>
        </>
    );
}

export const getStaticProps = async () => {
    const data = await getSinglePost('gratis-tagberegner-beregn-pris-pa-dit-nye-tag');
    return {
        props: { data },
        revalidate: 10,
    }
}
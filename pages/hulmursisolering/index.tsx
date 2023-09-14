import dynamic from "next/dynamic";
import Seo from "../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";

const HulmurSearch = dynamic(() => import("../../components/HulmurSearch"), {
    ssr: false,
    // The loading element should be the same size as the search box. 
    loading: () => <div style={{ height: "60px", width: "100%" }}></div>,
});

export default function PrisPaaTag(props) {
    return (
        <>
            <Seo
                title="Hvad koster det at skifte tag? - Din guide til pris på nyt tag i 2023"
                description="At få et nyt tag på dit hus kan være en stor investering, så det er vigtigt at forstå omkostningerne ved et nyt tag, inden du begynder projektet. Prisen for et nyt tag kan variere meget afhængigt af flere faktorer"
                canonical="https://www.tagberegneren.dk/hvad-koster-det-at-skifte-tag" />
            <section className="titleSection">
                <div className="container">
                    <div className={` grid grid-cols-1 sm:mt-20`}>
                        <div className="mt-2 lg:mt-0 p-0">
                            <h1
                                className={`text-center text-5xl lg:text-7xl font-semibold lg:font-bold leading-snug lg:leading-snug`}>
                                Beregn gratis pris på <br className="hidden lg:block" />
                                <span className="tagrenoveringspan">hulmursisolering</span>
                            </h1><h2
                                className={`hidden lg:block font-medium text-lg lg:text-2xl mt-5 lg:mt-20 text-center `}>
                                Få en præcis pris og forventet besparelse ved hulmursisolering på kun{" "}
                                <span className="tagrenoveringspan">10 sekunder</span>
                            </h2><p
                                className="lg:hidden font-medium text-2xl lg:text-2xl mt-5 lg:mt-20 text-center ">
                                Få en præcis pris og forventet besparelse ved hulmursisolering på kun{" "}
                                <span className="tagrenoveringspan">10 sekunder</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 searchAdresseDiv">
                        <div className="mt-5 md:mt-0">
                            <HulmurSearch />
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-section">
                <div className="container" dangerouslySetInnerHTML={{ __html: props.data?.content }}></div>
            </section>
        </>
    );
}

export const getStaticProps = async () => {
    const data = await getSinglePost('hulmursisolering');
    return {
        props: { data }
    }
}
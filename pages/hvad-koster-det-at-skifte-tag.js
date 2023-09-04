import Seo from "./../components/Seo";
import { getSinglePost } from "../lib/wordpress";
import AdresseSearch from "../components/AdresseSearch";

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
                                <span className="tagrenoveringspan">nyt tag</span>
                            </h1><h2
                                className={`hidden lg:block font-medium text-lg lg:text-2xl mt-5 lg:mt-20 text-center `}>
                                Vores algoritme udregner tagaeral, pris og meget mere på kun{" "}
                                <span className="tagrenoveringspan">10 sekunder</span>
                            </h2><p
                                className="lg:hidden font-medium text-2xl lg:text-2xl mt-5 lg:mt-20 text-center ">
                                Vores algoritme udregner tagaeral, pris og meget mere på kun{" "}
                                <span className="tagrenoveringspan">10 sekunder</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 searchAdresseDiv">
                        <div className="flex justify-start lg:justify-end mt-5 md:mt-0">
                            <AdresseSearch
                                home={props.home}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="blog-section">
                <div className="container" dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
            </section>
        </>
    );
}

export const getStaticProps = async () => {
    const data = await getSinglePost('hvad-koster-det-at-skifte-tag');
    return {
        props: { data }
    }
}
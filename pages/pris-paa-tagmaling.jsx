import Seo from "../components/Seo";
import { getSinglePost } from "../lib/wordpress";
import AdresseSearch from "../components/AdresseSearch";
import DerforSection from "../components/DerforSection";
import GodeRåd from "../components/GodeRåd";

export default function PrisPaaTag(props) {
    return (
        <>
            <Seo
                title="Få en pris på tagmaling - Vores algorithm udregner prisen på 10 sekunder"
                description="Vil du have en vejledende pris på maling af dit tag. Indtast blot din adresse og vores beregner klarer resten for dig"
                canonical="https://www.tagberegneren.dk/pris-paa-tagmaling"
            />
            <section className="titleSection">
                <div className="container">
                    <div className={` grid grid-cols-1 sm:mt-20`}>
                        <div className="mt-2 lg:mt-0 p-0">
                            <h1
                                className={`text-center text-5xl lg:text-7xl font-semibold lg:font-bold leading-snug lg:leading-snug`}>
                                Beregn gratis pris på <br className="hidden lg:block" />
                                <span className="tagrenoveringspan">tagmaling</span>
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
            <DerforSection />
            <GodeRåd />
            <section className="blog-section">
                <div className="container" dangerouslySetInnerHTML={{ __html: props.data.content }}></div>
            </section>
        </>
    );
}

export const getStaticProps = async () => {
    const data = await getSinglePost('pris-pa-tagmaling');
    return {
        props: { data }
    }
}
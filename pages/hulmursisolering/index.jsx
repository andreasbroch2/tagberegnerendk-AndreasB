import dynamic from "next/dynamic";
import Seo from "../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";

const HulmurSearch = dynamic(() => import("../../components/HulmurSearch"), {
    ssr: false,
    // The loading element should be the same size as the search box. 
    loading: () => <div style={{ height: "60px", width: "100%" }}></div>,
});

export default function Hulmursisolering(props) {
    return (
        <>
            <Seo
                title="Hvad koster hulmursisolering? - Få en gratis pris på hulmursisolering her"
                description="Få en gratis pris på hulmursisolering her. Beregn prisen på hulmursisolering på kun 10 sekunder. Få en præcis pris og forventet besparelse ved hulmursisolering på kun 10 sekunder."
                canonical="https://www.tagberegneren.dk/hulmursisolering" />
            <section className="titleSection">
                <div className="container">
                    <div className={` grid grid-cols-1 sm:mt-20`}>
                        <div className="mt-2 lg:mt-0 p-0">
                            <h1>
                                Beregn gratis pris på <br className="hidden lg:block" />
                                <span className="tagrenoveringspan">hulmursisolering</span>
                            </h1>
                            <h2
                                className={`text-lg lg:text-2xl mt-5 lg:mt-20 text-center `}>
                                Få en præcis pris og forventet besparelse ved hulmursisolering på kun{" "}
                                <span className="tagrenoveringspan">2 minutter</span>
                            </h2>
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
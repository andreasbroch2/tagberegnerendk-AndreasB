import Seo from "../components/Seo";
import { getSinglePost } from "../lib/wordpress";
import AdresseSearch from "../components/AdresseSearch";
import DerforSection from "../components/DerforSection";
import ServerToc from "../components/ServerToc";
import Head from "next/head";
import { BreadcrumbJsonLd } from "next-seo";
import CleanLinks from "../components/CleanLinks";

export default function PrisPaaTag(props) {
    return (
        <>
            <Head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: props.data.seo.schema?.raw }} />
            </Head>
            <BreadcrumbJsonLd
                itemListElements={[
                    {
                        position: 1,
                        name: 'Forside - Tagberegneren.dk',
                        item: 'https://www.tagberegneren.dk',
                    },
                    {
                        position: 2,
                        name: 'Hvad koster tagmaling?',
                        item: 'https://www.tagberegneren.dk/pris-paa-tagmaling',
                    },
                ]}
            />
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
            <section className="entry-content blog-section md:px-4 flex">
                <div className="md:basis-2/3">
                    <div className="max-w-3xl mx-auto">
                        <div id="article-text" dangerouslySetInnerHTML={{ __html: props.cleanElement }}>
                        </div>
                    </div>
                </div>
                <div className="hidden md:basis-1/3 md:block sticky top-0 max-h-[95vh] overflow-y-auto">
                    <div className=''>
                        <div className="toc-container mt-6 w-fit mx-auto">
                            <div className="info">
                                <ServerToc html={props.cleanElement} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export const getStaticProps = async () => {
    const data = await getSinglePost('pris-pa-tagmaling');
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement }
    }
}
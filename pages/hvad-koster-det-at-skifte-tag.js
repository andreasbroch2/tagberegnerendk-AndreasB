import dynamic from "next/dynamic";
import Head from "next/head";
import { BreadcrumbJsonLd } from "next-seo";
import Seo from "./../components/Seo";
import { getSinglePost } from "../lib/wordpress";
import DerforSection from "../components/DerforSection";
import ServerToc from "../components/ServerToc";

const DynamixAdresseSearch = dynamic(() => import("../components/AdresseSearch"), {
    loading: () =>
        <div className="addressInputDiv">
            <div className={`searchButtonDiv block transition-all sticky top-0`}>
                <button
                    className="w-full font-medium bg-orange-500 text-white p-5 rounded-lg shadow-lg hover:bg-orange-600 active:bg-orange-700"
                >
                    Start her
                </button>
            </div>
        </div>,
    ssr: false,
});

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
                        name: 'Hvad koster det at skifte tag?',
                        item: 'https://www.tagberegneren.dk/hvad-koster-det-at-skifte-tag',
                    },
                ]}
            />
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
                            <DynamixAdresseSearch />
                        </div>
                    </div>
                </div>
            </section>
            <DerforSection />
            <section className="entry-content blog-section md:px-4 flex">
                <div className="md:basis-2/3">
                    <div className="max-w-3xl mx-auto">
                        <div id="article-text" dangerouslySetInnerHTML={{ __html: props.data?.content }}>
                        </div>
                    </div>
                </div>
                <div className="hidden md:basis-1/3 md:block sticky top-0 max-h-[95vh] overflow-y-auto">
                    <div className=''>
                        <div className="toc-container mt-6 w-fit mx-auto">
                            <div className="info">
                                <ServerToc html={props.data?.content} />
                            </div>
                        </div>
                    </div>
                </div>
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
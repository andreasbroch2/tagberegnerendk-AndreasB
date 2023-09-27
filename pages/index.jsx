import dynamic from "next/dynamic";
import Head from "next/head";
import { BreadcrumbJsonLd } from "next-seo";
import Seo from "../components/Seo";
import ServerToc from "../components/ServerToc";
import { getSinglePost } from "../lib/wordpress";
// import AdresseSearch from "../components/AdresseSearch";
import DerforSection from "../components/DerforSection";
import GodeRåd from "../components/GodeRåd";
import CleanLinks from "../components/CleanLinks";
import postConverter from "../lib/postConverter";

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

const VideoComponent = dynamic(() => import("../components/VideoComponent"), {
    ssr: false,
});

export default function Home(props) {
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
                ]}
            />
            <Seo
                title="Gratis Tagberegner - Beregn pris på dit nye tag"
                description="Udregn gratis og hurtigt en pris på dit nye tag. Indtast blot din adresse."
                canonical="https://www.tagberegneren.dk" />
            <section className="titleSection">
                <div className="container">
                    <div className={` grid grid-cols-1 sm:mt-20`}>
                        <div className="mt-2 lg:mt-0 p-0">
                            <h1
                                className={`text-center text-5xl lg:text-7xl font-semibold lg:font-bold leading-snug lg:leading-snug`}>
                                Beregn gratis pris på <br className="hidden lg:block" />
                                <span className="tagrenoveringspan">nyt tag</span>
                            </h1>
                            <h2
                                className={`hidden lg:block font-medium text-lg lg:text-2xl mt-5 lg:mt-20 text-center `}>
                                Vores algoritme udregner tagaeral, pris og meget mere på kun{" "}
                                <span className="tagrenoveringspan">10 sekunder</span>
                            </h2>
                            <p
                                className="lg:hidden font-medium text-2xl lg:text-2xl mt-5 lg:mt-20 text-center ">
                                Vores algoritme udregner tagaeral, pris og meget mere på kun{" "}
                                <span className="tagrenoveringspan">10 sekunder</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 searchAdresseDiv">
                        <div className="flex justify-start lg:justify-end mt-5 md:mt-0">
                            <DynamixAdresseSearch
                                home={props.home}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <DerforSection />
            <GodeRåd />
            <section className="container">
                <h2>Se en video om hvordan Tagberegneren.dk virker</h2>
                <VideoComponent
                    title="Sådan virker Tagberegneren.dk"
                    description="Tagberegneren.dk giver dig en nøjagtig pris på dit nye tag eller din nye tagmaling. Det tager kun 30 sekunder at få en pris. Det hele regnes ud automatisk, så snart du har indtastet din adresse."
                    date="2023-09-27"
                    youtubeId="hGAF2ATNS2s" />
            </section>
            <section className="entry-content blog-section md:px-4 flex">
                <div className="md:basis-2/3">
                    <div className="max-w-3xl mx-auto">
                        <div id="article-text">
                            {postConverter(props.cleanElement)}
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

export async function getStaticProps() {
    const data = await getSinglePost('gratis-tagberegner-beregn-pris-pa-dit-nye-tag');
    const cleanElement = CleanLinks(data.content);
    return {
        props: {
            data,
            cleanElement,
        },
    }
}
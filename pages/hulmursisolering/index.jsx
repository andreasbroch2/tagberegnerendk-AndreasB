import dynamic from "next/dynamic";
import Seo from "../../components/Seo";
import { getSinglePost } from "../../lib/wordpress";
import CleanLinks from "../../components/CleanLinks";
import postConverter from "../../lib/postConverter";
import ServerToc from "../../components/ServerToc";

const HulmurSearch = dynamic(() => import("../../components/HulmurSearch"), {
    ssr: false,
    // The loading element should be the same size as the search box. 
    loading: () => <div style={{ height: "60px", width: "100%" }}></div>,
});

export default function Hulmursisolering(props) {
    return (
        <>
            <Seo
                type="article"
                props={props.data}
                canonical="https://www.tagberegneren.dk/hulmursisolering"
            />
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

export const getStaticProps = async () => {
    const data = await getSinglePost('hvad-koster-hulmursisolering-guide');
    const cleanElement = CleanLinks(data.content);
    return {
        props: { data, cleanElement }
    }
}
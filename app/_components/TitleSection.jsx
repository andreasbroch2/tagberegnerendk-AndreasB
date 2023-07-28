import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";

// Importér dynamiske komponenter asynkront ved hjælp af Next.js dynamic-funktionen
import AdresseSearch from "./AdresseSearch.jsx";

export default function TitleSection(props) {
    const [scrollToInput, setScrollToInput] = useState(true);
    const adresseSearchRef = useRef(null);

    const handleSearchTextChange = (value) => {
        const isInputEmpty = value.trim() === "";
        setScrollToInput(isInputEmpty);
    };

    if (!scrollToInput && adresseSearchRef.current) {
        window.scrollTo({
            top: adresseSearchRef.current.offsetTop,
            behavior: "smooth",
        });
    }

    return (
        <>
            <section className="titleSection">
                <div className="container">
                    <div className={` grid grid-cols-1 sm:mt-20`}>
                        <div className="mt-2 lg:mt-0 p-0">
                            <>
                                <h1
                                    className={`text-center text-5xl lg:text-7xl font-semibold lg:font-bold leading-snug lg:leading-snug`}>
                                    Beregn nøjagtig pris på <br className="hidden lg:block" />
                                    <span className="tagrenoveringspan">nyt tag</span> og{" "}
                                    <span className="tagrenoveringspan">tagmaling</span>
                                </h1>
                                <p
                                    className={`hidden lg:block font-medium text-lg lg:text-2xl mt-5 lg:mt-20 text-center `}>
                                    Det tager kun{" "}
                                    <span className="tagrenoveringspan">30 sekunder</span> at få en
                                    nøjagtig pris på et nyt tag eller tagmaling!
                                </p>
                            </>

                            <p
                                ref={adresseSearchRef}
                                className="lg:hidden font-medium text-2xl lg:text-2xl mt-5 lg:mt-20 text-center ">
                                Beregn pris på{" "}
                                <span className="tagrenoveringspan">30 sekunder</span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 searchAdresseDiv">
                        <div className="flex justify-start lg:justify-end mt-5 md:mt-0">
                            <AdresseSearch
                                home={props.home}
                                setAdresse={props.setAdresse}
                                onSearchTextChange={handleSearchTextChange}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

import dynamic from 'next/dynamic'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { useEffect, useState } from 'react'

const AdresseSearch = dynamic(() => import('./AdresseSearch.jsx'), {
    loading: () => <p>Henter...</p>,
})


export default function TitleSection(props) {
    const [testState, setTestState] = useState(false)
    const ctaVariant = useFeatureFlagVariantKey('title-exp');

    useEffect(() => {
        if (ctaVariant === 'test') {
            setTestState(true)
        }
    }, [ctaVariant])
    return (
        <>
            <section className="titleSection">
                <div className="container">
                    <div className={` grid grid-cols-1 sm:mt-20`}>
                        <div className="mt-2 lg:mt-0 p-0">
                            {testState ? (
                                <>
                                    <h1
                                        className={`text-center text-5xl lg:text-7xl font-semibold lg:font-bold leading-snug lg:leading-snug`}>
                                        Beregn nøjagtig pris på <br className="hidden lg:block" />
                                        <span className="tagrenoveringspan">nyt tag</span> og{" "}
                                        <span className="tagrenoveringspan">tagmaling</span>
                                    </h1><h2
                                        className={`hidden lg:block font-medium text-lg lg:text-2xl mt-5 lg:mt-20 text-center `}>
                                        Det tager kun{" "}
                                        <span className="tagrenoveringspan">30 sekunder</span> at få en
                                        nøjagtig pris på et nyt tag eller tagmaling!
                                    </h2><p
                                        className="lg:hidden font-medium text-2xl lg:text-2xl mt-5 lg:mt-20 text-center ">
                                        Beregn pris på{" "}
                                        <span className="tagrenoveringspan">30 sekunder</span>
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h1
                                        className={`text-center text-5xl lg:text-7xl font-semibold lg:font-bold leading-snug lg:leading-snug`}>
                                        Beregn gratis pris på <br className="hidden lg:block" />
                                        <span className="tagrenoveringspan">nyt tag</span>
                                    </h1><h2
                                        className={`hidden lg:block font-medium text-lg lg:text-2xl mt-5 lg:mt-20 text-center `}>
                                        Det tager kun{" "}
                                        <span className="tagrenoveringspan">30 sekunder</span> at få en
                                        nøjagtig pris på et nyt tag eller tagmaling!
                                    </h2><p
                                        className="lg:hidden font-medium text-2xl lg:text-2xl mt-5 lg:mt-20 text-center ">
                                        Vores algoritme udregner tagaeral, pris og meget mere på kun{" "}
                                        <span className="tagrenoveringspan">10 sekunder</span>
                                    </p>
                                </>
                            )}
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
        </>
    );
}

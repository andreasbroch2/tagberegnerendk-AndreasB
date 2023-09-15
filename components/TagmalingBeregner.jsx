export default function TagmalingBeregner(){
    return (
        <>
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
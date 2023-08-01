"use client";

import { getPriceData } from "../utils/Serveractions/serverActions";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

export default function Pris() {
    const searchParams = useSearchParams();

    const priceID = searchParams.get("id");
    const [priceData, setPriceData] = useState(null);
    const [pickedPrice, setPickedPrice] = useState("samletPris");

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        try {
            const leadsData = await getPriceData(priceID);
            setPriceData(leadsData);
        } catch (error) {
            console.error("Error fetching leads:", error);
        }
    };

    const convertToPlainValue = (obj) => {
        if (typeof obj !== "object" || obj === null) {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map((item) => convertToPlainValue(item));
        }

        const plainObject = {};
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                plainObject[key] = convertToPlainValue(obj[key]);
            }
        }
        return plainObject;
    };

    if (priceData === null) {
        return (
            <div className="container mt-20">
                <h1 className="mt-20 p-20 font-semibold text-xl text-center">
                    Leder efter prisdata...
                </h1>
            </div>
        );
    }

    return (
        <section>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="col-span-3 lg:col-span-1">
                        <div className=" bg-white rounded-xl p-5 shadow-xl">
                            <div className=" flex justify-between gap-5">
                                <img
                                    src="https://asset.dr.dk/imagescaler01/https%3A%2F%2Fwww.dr.dk%2Fimages%2Fother%2F2015%2F04%2F18%2Fa236298c-17fa-4447-b907-0d955c327895_20140307-120447-a-1000x667-we.jpg&w=620"
                                    alt="rådgiverFoto"
                                    className="rådgiverFoto rounded-full object-cover my-auto"
                                />
                                <div>
                                    <p className="font-light text-sm">Din personlige rådgiver</p>
                                    <h4 className="font-bold text-lg lg:text-1xl">Martin Larsen</h4>
                                </div>
                                <div className="my-auto">
                                    <button className="px-2 lg:px-5 py-1 bg-mygreen rounded-lg text-white font-medium">
                                        Kontakt
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 lg:col-span-2 gap-5">
                        {priceData.nyTagTypeTekst == "Tagmaling" ? null : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
                                <a
                                    href="#price"
                                    onClick={() => setPickedPrice("lavSamletPris")}
                                    className={`${
                                        pickedPrice === "lavSamletPris"
                                            ? "bg-green-200"
                                            : "bg-white"
                                    } rounded-lg shadow-lg p-5 text-center flex gap-2 justify-center`}>
                                    <p className="font-semibold">Laveste pris</p>
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                </a>
                                <a
                                    href="#price"
                                    onClick={() => setPickedPrice("samletPris")}
                                    className={`${
                                        pickedPrice === "samletPris" ? "bg-green-200" : "bg-white"
                                    } rounded-lg shadow-lg p-5 text-center flex gap-2 justify-center`}>
                                    <p className="font-semibold">Middel pris</p>
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                </a>
                                <a
                                    href="#price"
                                    onClick={() => setPickedPrice("hojSamletPris")}
                                    className={`${
                                        pickedPrice === "hojSamletPris"
                                            ? "bg-green-200"
                                            : "bg-white"
                                    } rounded-lg shadow-lg p-5 text-center flex gap-2 justify-center`}>
                                    <p className="font-semibold">Højeste pris</p>
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                </a>
                            </div>
                        )}

                        <div id="price" className="bg-white rounded-xl shadow-lg border p-10">
                            <h4 className="font-semibold text-2xl">Prisberegning</h4>

                            <div>
                                <p className="font-semibold mt-5">Kunde:</p>
                                <p className="font-light">
                                    {priceData.fornavn} {priceData.efternavn}
                                </p>
                                <p className="font-light">{priceData.adresse}</p>
                                <p className="font-light">{priceData.email}</p>
                                <p className="font-light">{priceData.telefon}</p>
                            </div>
                            <div>
                                <p className="font-light mt-5">Din beregnede pris:</p>
                                {pickedPrice === "lavSamletPris" ? (
                                    <>
                                        <h4 className="font-semibold text-2xl">
                                            {priceData.lavSamletPris}
                                        </h4>
                                        <p className="font-light text-sm mt-2">
                                            Dette er en lav pris. Det er denne pris du forventeligt
                                            vil få i et tilbud fra de færreste håndværkere. Har
                                            ingen skorsten, tagvinder ell. Kan prisen gå ned i den
                                            lave pris. Du bør være varsom med at godtage priser
                                            under denne pris, da det er vanskeligt at udføre et
                                            ordentligt stykke arbejde til denne pris.
                                        </p>
                                    </>
                                ) : null}
                                {pickedPrice === "samletPris" &&
                                priceData.nyTagTypeTekst !== "Tagmaling" ? (
                                    <>
                                        <h4 className="font-semibold text-2xl">
                                            {priceData.samletPris}
                                        </h4>
                                        <p className="font-light text-sm mt-2">
                                            Dette er en middel pris. Det er denne pris du
                                            forventeligt vil få i et tilbud fra de fleste
                                            håndværkere. Har du mange tagvinduer, skorsten ell. Kan
                                            prisen gå op i den høje pris.
                                        </p>
                                    </>
                                ) : null}
                                {pickedPrice === "hojSamletPris" ? (
                                    <>
                                        <h4 className="font-semibold text-2xl">
                                            {priceData.hojSamletPris}
                                        </h4>
                                        <p className="font-light text-sm mt-2">
                                            Dette er en høj pris. Du kan støde på denne pris, hvis
                                            dit tag er meget komplekst eller, hvis blot håndværkeren
                                            har en høj timepris. Du bør være varsom med at godtage
                                            priser over denne.
                                        </p>
                                    </>
                                ) : null}
                                {pickedPrice === "samletPris" &&
                                priceData.nyTagTypeTekst == "Tagmaling" ? (
                                    <>
                                        <h4 className="font-semibold text-2xl">
                                            {priceData.tagMalingPris}
                                        </h4>
                                        <p className="font-light text-sm mt-2">
                                            Dette er en mere eller mindre standard pris for
                                            tagmaling af et tag som dit, med den tagvinkel du har.
                                        </p>
                                    </>
                                ) : null}
                            </div>
                            <p className="text-sm font-ligth text-gray-300 text-center mt-10">
                                ID: {priceID}
                            </p>
                        </div>
                        {priceData.nyTagTypeTekst !== "Tagmaling" ? (
                            <div className="bg-white rounded-xl shadow-lg border p-10 mt-10">
                                <h4 className="font-semibold text-2xl">Specifikationer</h4>
                                <div>
                                    {/* Dotted list */}
                                    <ul className="list-disc list-inside mt-5">
                                        <li className="font-light">Nedtagning af nuværende tag</li>
                                        <li className="font-light">
                                            Nyt undertag, hvis nødvendigt
                                        </li>
                                        <li className="font-light">Nye lægter</li>
                                        <li className="font-light">Nye tagsten/tagplader</li>
                                        <li className="font-light">Stillads</li>
                                        <li className="font-light">Bortkørsel af affald</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mt-5">Bemærkninger:</p>
                                    <p className="font-light">
                                        Der kan være ting der er nødvendige for arbejdet, som ikke
                                        er inkluderet i denne prisberegning.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-lg border p-10 mt-10">
                                <h4 className="font-semibold text-2xl">Specifikationer</h4>
                                <div>
                                    {/* Dotted list */}
                                    <ul className="list-disc list-inside mt-5">
                                        <li className="font-light">Afrensning af tag</li>
                                        <li className="font-light">Småreparationer af taget</li>
                                        <li className="font-light">2 lag maling</li>
                                        <li className="font-light">Bortkørsel af affald</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-semibold mt-5">Bemærkninger:</p>
                                    <p className="font-light">
                                        Der kan være ting der er nødvendige for arbejdet, som ikke
                                        er inkluderet i denne prisberegning.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-xl shadow-lg border p-10 mt-10 border border-green-300">
                            <h4 className="font-semibold text-2xl">Vi anbefaler</h4>
                            <p className="font-light mt-3">
                                Ud fra dine indtaste informationer har vi vha. vores algoritmer
                                fundet den håndværker i dit område som vi finder bedste egnet til at
                                udføre din opgave
                            </p>
                            <div className="flex flex-col lg:flex-row justify-between mt-5">
                                <div className="flex gap-5">
                                    <img
                                        src="https://total-byg.com/wp-content/uploads/2022/08/Total-byg-danmark.png"
                                        alt="Billede af håndværker"
                                        className="w-20 h-20 rounded-full object-cover border border-green-400"
                                    />
                                    <div className="flex flex-col my-auto">
                                        <h4 className="font-semibold text-xl my-auto">
                                            Total Byg Danmark
                                        </h4>
                                        <div className="flex gap-1">
                                            <Icon
                                                icon="material-symbols:star-outline"
                                                color="#13BA00"
                                            />
                                            <Icon
                                                icon="material-symbols:star-outline"
                                                color="#13BA00"
                                            />
                                            <Icon
                                                icon="material-symbols:star-outline"
                                                color="#13BA00"
                                            />
                                            <Icon
                                                icon="material-symbols:star-outline"
                                                color="#13BA00"
                                            />
                                            <Icon
                                                icon="material-symbols:star-outline"
                                                color="#13BA00"
                                            />
                                        </div>
                                        <p className="font-light text-sm">
                                            Vurderet af vores brugere
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-5 lg:my-auto">
                                    <a href="tel:41974444">
                                        <button className="bg-mygreen w-full lg:w-fit text-white font-semibold p-3 lg:p-5 rounded-lg shadow-sm">
                                            Kontakt håndværker
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

'use client';

import { getPriceData } from "../utils/Serveractions/serverActions";
import { gratisTagTjek } from "../utils/Serveractions/buyLead";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import va from "@vercel/analytics";
import { event } from "nextjs-google-analytics";

export default function Pris() {
    const searchParams = useSearchParams();
    const priceID = searchParams.get("id");
    const [priceData, setPriceData] = useState(null);
    const [pickedPrice, setPickedPrice] = useState("samletPris");
    const [gratisTakTjekShow, setGratisTakTjekShow] = useState(true);

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
    // Show Modal
    function showModal() {
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    }
    function closeModal() {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    // Show modal after 1 second
    setTimeout(() => {
        if (gratisTakTjekShow && !priceData.gratisTagTjek) {
            showModal();
        }
    }, 3000);

    function acceptTagTjek() {
        gratisTagTjek(priceData._id, true);
        va.track("Gratis Tagtjek - Accept");
        event("Gratis Tagtjek - Accept", {
            category: "Gratis Tagtjek",
            label: 'Gratis Tagtjek',
        });
        setGratisTakTjekShow(false);
        closeModal();
    }
    function declineTagTjek() {
        gratisTagTjek(priceData._id, false);
        va.track("Gratis Tagtjek - Decline");
        event("Gratis Tagtjek - Decline", {
            category: "Gratis Tagtjek",
            label: 'Gratis Tagtjek',
        });
        setGratisTakTjekShow(false);
        closeModal();
    }
    function trackTilbudButton() {
        va.track("Tilbud - Klik");
        event("Tilbud - Klik", {
            category: "Tilbud",
            label: 'Tilbud',
        });
    }
    return (
        <section>
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="col-span-3 lg:col-span-3 gap-5 mx-auto">
                        {priceData.nyTagTypeTekst == "Tagmaling" ? null : (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10 hidden">
                                <Link
                                    href="#price"
                                    onClick={() => setPickedPrice("lavSamletPris")}
                                    className={`${pickedPrice === "lavSamletPris"
                                        ? "bg-green-200"
                                        : "bg-white"
                                        } rounded-lg shadow-lg p-5 text-center flex gap-2 justify-center`}>
                                    <p className="font-semibold">Laveste pris</p>
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                </Link>
                                <Link
                                    href="#price"
                                    onClick={() => setPickedPrice("samletPris")}
                                    className={`${pickedPrice === "samletPris" ? "bg-green-200" : "bg-white"
                                        } rounded-lg shadow-lg p-5 text-center flex gap-2 justify-center`}>
                                    <p className="font-semibold">Middel pris</p>
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                </Link>
                                <Link
                                    href="#price"
                                    onClick={() => setPickedPrice("hojSamletPris")}
                                    className={`${pickedPrice === "hojSamletPris"
                                        ? "bg-green-200"
                                        : "bg-white"
                                        } rounded-lg shadow-lg p-5 text-center flex gap-2 justify-center`}>
                                    <p className="font-semibold">Højeste pris</p>
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                    <Icon icon="ph:coin" color="#13BA00" className="my-auto" />
                                </Link>
                            </div>
                        )}

                        <div id="price" className="bg-white rounded-xl shadow-lg border p-4 md:p-10">
                            <h3>Prisberegning</h3>
                            <div>
                                <p className="font-semibold mt-5">Dine oplysninger:</p>
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
                        </div>
                        {priceData.nyTagTypeTekst !== "Tagmaling" ? (
                        <div id="tilbud" className="bg-white rounded-xl shadow-lg border p-4 md:p-10 mt-5 md:mt-10">
                            <h3 className="mb-5">Få tilbud på dit tagprojekt</h3>
                            <p className="font-light mb-2">I samarbejde med <strong>3byggetilbud</strong> kan vi tilbyde dig at få 3 gratis og ganske uforpligtende tilbud på dit projekt.</p>
                            <p className="font-light mb-2">3byggetilbud er en gratis og uforpligtende online service, der hjælper dig med at finde den rette håndværker til dit projekt.</p>
                            <p className="font-semibold">Det er helt gratis og uforpligtende for dig at modtage tilbud. Du vælger selv, om du vil acceptere et af tilbuddene.</p>
                            <p className="font-semibold mt-5 mb-2">Sådan fungerer det:</p>
                            <ol className="list-decimal list-inside text-xl mb-5">
                                <li className="font-light">Du udfylder formularen med dine oplysninger</li>
                                <li className="font-light">Du modtager 3 tilbud fra håndværkere</li>
                                <li className="font-light">Du vælger det tilbud, der passer dig bedst</li>
                            </ol>
                            <p className="font-semibold">For at gøre det nemt for dig har vi klargjort en opgavebeskrivelse på baggrund af dine informationer:</p>
                            <div className="bg-gray-100 rounded-lg p-5 mt-5">
                                <p className="font-semibold">Opgavebeskrivelse:</p>
                                <p className="font-light">Jeg skal have udskiftet mit tag. Taget er ca. {priceData.tagfladeareal} m2 og har en tagvinkel på {priceData.tagVinkel} grader. Der er {priceData.hojdeTilTagrende} m til tagrende. Det gamle tag er {priceData.boligTagTypeTekst} og vi ønsker at skifte til {priceData.nyTagTypeTekst}.</p>
                            {/* Button to copy above text */}
                            <button className="bg-gray-500 hover:bg-green-600 text-sm text-white font-light py-2 px-4 rounded-lg shadow-sm mt-5" onClick={() => navigator.clipboard.writeText(`Jeg skal have udskiftet mit tag. Taget er ca. ${priceData.tagfladeareal} m2 og har en tagvinkel på ${priceData.tagVinkel} grader. Der er ${priceData.hojdeTilTagrende} m til tagrende. Det gamle tag er ${priceData.boligTagTypeTekst} og vi ønsker at skifte til ${priceData.nyTagTypeTekst}.`)}>
                                Kopier
                            </button>
                            </div>
                           <div className="flex justify-center mt-5">
                                <div className="bg-mygreen hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm">
                                    <a onClick={trackTilbudButton()} href="/3byggetilbud/" target="_blank">Få 3 gratis tilbud</a>
                                </div>
                            </div>
                        </div>
                        ) : null}
                        {priceData.nyTagTypeTekst !== "Tagmaling" ? (
                            <div className="bg-white rounded-xl shadow-lg border p-4 md:p-10 mt-5 md:mt-10">
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
                            <div className="bg-white rounded-xl shadow-lg border p-4 md:p-10 mt-5 md:mt-10">
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

                        <div className="hidden bg-white rounded-xl shadow-lg border p-10 mt-10 border border-green-300">
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
                                    <Link href="tel:41974444">
                                        <button className="bg-mygreen w-full lg:w-fit text-white font-semibold p-3 lg:p-5 rounded-lg shadow-sm">
                                            Kontakt håndværker
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="myModal">
                <div className="modal-overlay">
                    <div className="modal-container bg-white">
                        <div className="modal-content">
                            <h3 className="font-semibold mb-4">Du er kvalificeret til et gratis tagtjek</h3>
                            <p>På baggrund af dit tag og det område du bor, kan vi i samarbejde med <strong>Jydsk Tagteknik</strong> tilbyde dig et gratis tagtjek til en værdi af <strong>2.995,-</strong></p>
                            <h4 className="my-4">Få styr på skaderne i tide og undgå dyre regninger</h4>
                            <p className="mb-4">Dit tag vil blive gennemgået og vurderet om det er i orden eller om der er brug for en mindre reparation, en renovering eller en udskiftning.</p>
                            <p className="my-4 font-bold">Tagtjekket og efterfølgende tilbud er 100% uforpligtende. Ved accept herunder vil Jydsk Tagteknik kontakte dig og aftale et tidspunkt til dit gratis tagtjek.</p>
                            <div className="flex justify-center mt-5">
                                <div
                                    onClick={acceptTagTjek}
                                    className="bg-mygreen hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg"
                                >
                                    Accepter
                                </div>
                                <button
                                    onClick={declineTagTjek}
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg ml-5"
                                >
                                    Afvis
                                </button>
                            </div>
                            <div className="mt-4">
                                <h4 className="mb-4">Om Jydsk Tagteknik</h4>
                                <p>Jydsk Tagteknik er en af danmarks førende tagfirmaer og har flere gange vundet prisen som årets tagfirma. De er dækket af Håndværkerens Tryghedsgaranti og dækker hele danmark</p>
                                <div className="flex flex-col md:flex-row justify-center place-items-center mt-4 p-4">
                                    <img src="/images/jydsk-tagteknik.png" className="h-fit" alt="Jydsk Tagteknik - Logo" />
                                    <img src="/images/trustpilot-4.5.png" alt="Trustpilot - 4.5 Stjerner" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

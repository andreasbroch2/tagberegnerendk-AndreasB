import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { event } from "nextjs-google-analytics";
import Image from "next/image";
import { usePostHog } from 'posthog-js/react';
import Seo from "../components/Seo";
import journalist from "../assets/journalist.jpg";
import jydskTagTeknik from "../assets/jydsk-tagteknik.png";
import trustpilot from "../assets/trustpilot-4.5.png";

export default function Pris() {
    const searchParams = useSearchParams();
    const priceID = searchParams.get("id");
    const [priceData, setPriceData] = useState(null);

    const posthog = usePostHog();

    useEffect(() => {
        fetchLeads();
    }, [priceID]);
    const fetchLeads = async () => {
        try {
            const response = await fetch("/api/getLead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ leadPriceId: priceID }),
            });
            const leadsData = await response.json();
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
    function trackTilbudButton() {
        event("Tilbud - Klik", {
            category: "Tilbud",
            label: 'Tilbud',
        });
        posthog.capture('Tilbud - Klik', {
            distinctId: priceData.leadPriceId,
        });
    }
    function copyText() {
        navigator.clipboard.writeText(`Jeg skal have udskiftet mit tag. Taget er fra ${priceData.tagAargang}. Tagarealet er på ${priceData.tagfladeareal} m2 og har en tagvinkel på ca. ${priceData.tagVinkel} grader. Der er ${priceData.hojdeTilTagrende} m til tagrende. Det gamle tag er ${priceData.boligTagTypeTekst} og skal skiftes til ${priceData.nyTagTypeTekst}. ${priceData.udhaeng && ("Tilbuddet skal også inkludere nyt udhæng. ")} ${priceData.tagrender && ("Tilbuddet skal også inkludere nye tagrender. ")}`);
        var succesElement = document.getElementById("succes-copy");
        succesElement.classList.remove("hidden");
        succesElement.classList.add("succes-message-copy");
        setTimeout(function () {
            succesElement.classList.remove("succes-message-copy");
            succesElement.classList.add("hidden");
        }, 2000);

    }
    return (
        <>
            <Seo title="Din prisberegning" description="Prisberegning på nyt tag eller tagmaling" />
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="col-span-3 lg:col-span-3 gap-5 mx-auto">
                            <div id="price" className="bg-white rounded-xl shadow-lg border p-4 md:p-10">
                                <h3>Prisberegning</h3>
                                <div className="flex">
                                    <div className="basis-1/2 mt-5 flex flex-col gap-2">
                                        <div>
                                            <p className="font-light text-sm">Tagfladeareal</p>
                                            <p className="font-medium">{priceData.tagfladeareal} m2</p>
                                        </div>
                                        <div>
                                            <p className="font-light text-sm">Højde til tagrende</p>
                                            <p className="font-medium">{priceData.hojdeTilTagrende} m</p>
                                        </div>
                                        <div>
                                            <p className="font-light text-sm">Tagvinkel</p>
                                            <p className="font-medium">{priceData.tagVinkel} grader</p>
                                        </div>
                                    </div>
                                    <div className="basis-1/2 mt-5 flex flex-col gap-2">
                                        <div>
                                            <p className="font-light text-sm">Ny Tagtype</p>
                                            <p className="font-medium">{priceData.nyTagTypeTekst}</p>
                                        </div>
                                        <div>
                                            <p className="font-light text-sm">Udhæng</p>
                                            <p className="font-medium">
                                                {priceData.udhaeng ? "Ja" : "Nej"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-light text-sm">Tagrender</p>
                                            <p className="font-medium">
                                                {priceData.tagrender ? "Ja" : "Nej"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="font-light mt-5">Din beregnede pris:</p>
                                    <h4 className="font-semibold text-2xl">
                                        {priceData.samletPris}
                                    </h4>
                                    <p className="font-light text-sm mt-2">
                                        Dette er en vejledende pris på baggrund af markedsdata og dine oplysninger. Din faktiske pris kan svinge efter valgt håndværker og dit tags beskaffenhed. Vi anbefaler at indhente tilbud på dit projekt for at få en præcis pris. Vi har gjort det nemt for dig herunder.
                                    </p>
                                </div>
                            </div>
                            {priceData.nyTagTypeTekst !== "Tagmaling" ? (
                                <div id="tilbud" className="bg-white rounded-xl shadow-lg border text-base p-4 md:p-10 mt-5 md:mt-10">
                                    <h3 className="mb-5">Få tilbud på dit tagprojekt</h3>
                                    <p className="font-light mb-2">I samarbejde med <strong>3byggetilbud</strong> kan vi tilbyde dig at få 3 tilbud på dit tagprojekt.</p>
                                    <p className="font-semibold">Det er helt gratis og uforpligtende for dig at modtage tilbud. Du vælger selv, om du vil acceptere et af tilbuddene.</p>
                                    <p className="font-semibold mt-5 mb-2">Fordele ved 3byggetilbud:</p>
                                    <ol className="list-decimal list-inside text-lg mb-5 ml-4">
                                        <li>Det er gratis og uforpligtende</li>
                                        <li>Spar tid og penge</li>
                                        <li>Personlig vejledning</li>
                                        <li>Entreprisegaranti</li>
                                    </ol>
                                    <p className="font-semibold">For at gøre det nemt for dig har vi klargjort en opgavebeskrivelse på baggrund af dine informationer:</p>
                                    <div className="bg-gray-100 rounded-lg p-5 mt-5 text-center">
                                        <p className="font-semibold">Opgavebeskrivelse:</p>
                                        <p className="font-light">Jeg skal have udskiftet mit tag. Taget er fra {priceData.tagAargang}. Tagarealet er på {priceData.tagfladeareal} m2 og har en tagvinkel på ca. {priceData.tagVinkel} grader. Der er {priceData.hojdeTilTagrende} m til tagrende. Det gamle tag er {priceData.boligTagTypeTekst} og skal skiftes til {priceData.nyTagTypeTekst}. {priceData.udhaeng && ("Tilbuddet skal også inkludere nyt udhæng. ")} {priceData.tagrender && ("Tilbuddet skal også inkludere nye tagrender. ")}</p>
                                        {/* Button to copy above text */}
                                        <div className="flex justify-center mt-5 relative">
                                            <div className="bg-gray-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm">
                                                <button onClick={copyText}>Kopier opgavebeskrivelse</button>
                                            </div>
                                            {/* Insert succes message after copying text. It should show a text just above the button for 2 seconds */}
                                            <div className="hidden transition-all" id="succes-copy">
                                                <p>Kopieret!</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center mt-5">
                                        <div className="bg-mygreen hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm">
                                            <a onClick={trackTilbudButton} href="/3byggetilbud/" target="_blank">Få 3 gratis tilbud</a>
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
                                        <Image
                                            src={journalist}
                                            alt="Billede af håndværker"
                                            className="w-20 h-20 rounded-full object-cover border border-green-400"
                                            placeholder="blur"
                                        />
                                        <div className="flex flex-col my-auto">
                                            <h4 className="font-semibold text-xl my-auto">
                                                Total Byg Danmark
                                            </h4>
                                            <div className="flex gap-1">
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
            </section>
        </>
    );
}

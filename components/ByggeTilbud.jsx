// Component which is a box that displays an offer from 3byggetilbud.dk that uses tailwindcss

import Image from "next/image";
import Link from "next/link";
import byggetilbudLogo from "../assets/3byggetilbud-logo.svg"
import checkmark from "../assets/checkmark.svg"
import BTTrustpilot from "./BTTrustpilot";

export default function ByggeTilbud() {
    return (
        <div className="border-2 border-bluebt container rounded-lg mb-8 bg-white">
            <div className="bg-primary p-4 rounded-t">
                <h3 className="">Få 3 priser på dit nye tag - Uforpligtende og inkl. rådgivning</h3>
            </div>
            <div className="flex md:flex-row-reverse p-6 gap-6 ">
                <div className="basis-1/3 flex flex-col items-center">
                    <figure>
                        <Image
                            src={byggetilbudLogo} alt="3byggetilbud - Logo" loading="eager" width={228} height={150} />
                    </figure>
                    <BTTrustpilot />
                </div>
                <div className="basis-2/3">
                    <p>Hvis du ønsker gratis rådgivning om tagrenovering og tre tilbud på et nyt tag, anbefaler vi dig at udfylde formularen hos vores samarbejdspartner, <Link href="/3byggetilbud">3byggetilbud.dk</Link>. </p>
                    <p>På den måde kan du få den nødvendige rådgivning og indhente de rette tilbud, der passer til dine behov.</p>
                    <p className="font-medium italic">Det er gratis, uforpligtende og med hurtigt svar.</p>
                    <p>3byggetilbud har siden år 2000 formidlet over 400.000 håndværkeropgaver og er således en af de største formidlere af byggetilbud i Danmark.</p>
                    <ul className="font-medium my-4">
                        <li><Image src={checkmark} className="inline" height={30} width={30} />  Hurtigt svar og tilbud i hele landet</li>
                        <li><Image src={checkmark} className="inline" height={30} width={30} />  4,6 stjerner på Trustpilot og over 400.000 udførte byggeopgaver</li>
                        <li><Image src={checkmark} className="inline" height={30} width={30} />  100% uforpligtende og med gratis rådgivning til opgaven</li>
                    </ul>
                    <p className="italic">Brug først vores beregner til at udregne dit tagareal og lave en opgavebeskrivelse klar til anmode om tilbud</p>
                </div>
            </div>
            <div className="text-center mb-8"><Link href="/3byggetilbud" className="acceptButton">Anmod om tilbud på din tagrenovering</Link></div>
        </div >
    );
}

export function ByggeTilbud2() {
    return (
        <section className="container">
            <div className="box">
            <h2 className="text-center">Få gratis og præcis pris på dit nye tag</h2>
                <div className="flex md:flex-row-reverse py-6 gap-6 ">
                    <div className="basis-1/3 flex flex-col items-center">
                        <figure>
                            <Image
                                src={byggetilbudLogo} alt="3byggetilbud - Logo" loading="eager" width={228} height={150} />
                        </figure>
                        <BTTrustpilot />
                    </div>
                    <div className="basis-2/3">
                        <p>Hvis du ønsker gratis rådgivning om tagrenovering og tre tilbud på et nyt tag, anbefaler vi dig at udfylde formularen hos vores samarbejdspartner, <Link href="/3byggetilbud">3byggetilbud.dk</Link>. </p>
                        <p>På den måde kan du få den nødvendige rådgivning og indhente de rette tilbud, der passer til dine behov.</p>
                        <p className="font-medium italic">Det er 100% gratis og uforpligtende at indhente en pris ved 3byggetilbud</p>
                       <ul className="font-medium my-4">
                            <li><Image src={checkmark} className="inline" height={30} width={30} />  Spar tid og penge</li>
                            <li><Image src={checkmark} className="inline" height={30} width={30} />  Personlig vejledning</li>
                            <li><Image src={checkmark} className="inline" height={30} width={30} />  Entreprisegaranti</li>
                            <li><Image src={checkmark} className="inline" height={30} width={30} />  Gratis & uforpligtende</li>
                        </ul>
                        <p className="italic">Brug først vores beregner til at udregne dit tagareal og lave en opgavebeskrivelse klar til at udfylde deres formular.</p>
                    </div>
                </div>
                <div className="text-center"><Link href="/3byggetilbud" className="acceptButton">Anmod om tilbud på din tagrenovering</Link></div>
            </div>
        </section>
    );
}
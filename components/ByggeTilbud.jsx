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
            <div className="text-center mb-8"><Link href="/3byggetilbud" className="acceptButton" target="_blank">Anmod om tilbud på din tagrenovering</Link></div>
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
                <div className="text-center"><Link href="/3byggetilbud" className="acceptButton" target="_blank">Anmod om tilbud på din tagrenovering</Link></div>
            </div>
        </section>
    );
}
export function SmallHorizontalBT() {
    return (
        <div className="gb-inside-container">
            <div className="gb-grid-wrapper gb-grid-wrapper-243c2492">
                <div className="gb-grid-column gb-grid-column-b61bc319"><div className="gb-container gb-container-b61bc319"><div className="gb-inside-container">
                    <div className="wp-block-image">
                        <figure className="aligncenter size-full is-resized"><a href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=14392&amp;bannerid=24047&amp;uid=forside&amp;uid2=cta2" rel="nofollow"><img decoding="async" loading="lazy" src="https://primabolig.dk/wp-content/uploads/2022/11/3byggetilbuddk-logo-hvid-1.png" alt="" className="wp-image-7563" style="width:200px;height:121px" width="200" height="121" /></a></figure></div>
                </div></div></div>

                <div className="gb-grid-column gb-grid-column-5f922b7b"><div className="gb-container gb-container-5f922b7b">

                    <div className="gb-headline gb-headline-3947c90e gb-headline-text">Få 3 gratis tilbud på nyt tag uanset opgaven</div>

                </div></div>

                <div className="gb-grid-column gb-grid-column-48b299ad"><div className="gb-container gb-container-48b299ad"><div className="gb-inside-container">
                    <div className="gb-button-wrapper gb-button-wrapper-e66fbf6f">

                        <a className="gb-button gb-button-a4cc5e0c" href="https://www.partner-ads.com/dk/klikbanner.php?partnerid=14392&amp;bannerid=24047&amp;uid=forside&amp;uid2=cta2" rel="nofollow"><span className="gb-icon"><svg aria-hidden="true" role="img" height="1em" width="1em" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg></span><span className="gb-button-text"><strong>Få tilbud nu</strong></span></a>

                    </div>
                    <div className="gb-headline gb-headline-3b2d6a4c gb-headline-text"><em>Gratis, uforpligtende og med hurtigt svar</em></div>
                </div></div></div>
            </div>
        </div>
    )
}
"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { ClerkProvider, SignUp } from "@clerk/clerk-react";
import Link from "next/link";

export default function BlivPartner() {
    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="w-full my-auto">
                            <h1 className="font-bold text-darkblue text-6xl lg:text-8xl">
                                Bliv <span className="text-mygreen">partner</span>
                            </h1>
                            <div className="mt-10 w-full">
                                <p className=" text-lg font-medium">
                                    Laver du tag eller er du tagmaler, og vil du have flere kunder?
                                </p>
                                <p className="text-lg font-light mt-5">
                                    Så er du kommet til det rette sted. Vi har kunder i hele
                                    Danmark, som søger efter en tagløsning. Vi samler kunderne
                                    sammen, der ønsker at få et nyt tag eller få malet deres tag, og
                                    sender dem videre til dig for en fast lav pris.
                                </p>
                                <button className="bg-mygreen px-7 py-3 text-white font-medium rounded-lg mt-5">
                                    <Link href="/sign-up">Opret dig gratis</Link>
                                </button>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <Image
                                src={"/partner.jpg"}
                                className="rounded-xl w-full h-auto"
                                width={640}
                                height={360}
                                blurDataURL="data:image/jpeg;base64,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"
                                placeholder="blur"
                                alt="Partner"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="derfor">
                <div className="container">
                    <div>
                        <h4 className="font-bold leading-tight text-4xl text-darkblue">
                            Partnerfordele
                        </h4>
                    </div>
                    <div className="p-5 lg:p-10 rounded-3xl bg-white shadow-xl mt-10">
                        <div className="grid grid-cols 1 lg:grid-cols-2 gap-10 lg:gap-20">
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <Icon
                                        icon="material-symbols:money-off"
                                        height={30}
                                        width={30}
                                        color="#13ba00"
                                    />
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Gratis oprettelse
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Det er 100% gratis at blive partner hos tagberegneren.dk. Vi
                                    tager ingen penge for at du bliver partner hos os. Du betaler
                                    kun for de leads du modtager.
                                </p>
                            </div>
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <Icon
                                        icon="solar:tag-price-linear"
                                        color="#13ba00"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Fast pris på leads
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Vi har en fast pris på 100 kr. pr. lead. Det betyder at du altid
                                    ved hvad du skal betale for et lead. Vi har ingen skjulte
                                    gebyrer eller lignende og du betaler kun for de leads du selv
                                    køber.
                                </p>
                            </div>
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <Icon
                                        icon="iconamoon:home"
                                        color="#13ba00"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Boligoplysninger
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Vi sender boligoplysninger med i hvert lead. Det betyder at du
                                    kan se hvilken type tag der er på boligen, og hvilken type tag
                                    kunden ønsker. Du kan også se hvor mange m2 tag der er på
                                    boligen, så du kan se om opgaven er noget for dig.
                                </p>
                            </div>
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <Icon
                                        icon="uil:slider-h-range"
                                        color="#13ba00"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Kundens pris
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Vi sender kunden pris med i det lead du modtager. Det betyder at
                                    du kan se den pris vi har beregnet til kunden, så ved du hvad
                                    kunden forventer i pris, når du kontakter dem for at give et
                                    tilbud.
                                </p>
                            </div>
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <Icon
                                        icon="game-icons:podium-winner"
                                        color="#13ba00"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Ingen konkurrence
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Det lead du køber er kun til dig. Det betyder at du ikke skal
                                    konkurrere med andre tagmaler eller taglæggere om opgaven. Når
                                    du har købt et lead er det kun dig der får oplysningerne på
                                    kunden. Hverken før eller efter du har købt er lead vil andre få
                                    oplysningerne på kunden.
                                </p>
                            </div>
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <Icon
                                        icon="mdi:deal-outline"
                                        color="#13ba00"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    En fast partner
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Når du er blevet partner hos os, er du det for altid. Det
                                    betyder at du ikke skal tilmelde dig igen, eller betale for at
                                    være partner hos os. Du er partner hos os for altid, og du kan
                                    købe leads når du har brug for det.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <h4 className="font-bold leading-tight text-4xl text-darkblue">
                        Hvad koster det?
                    </h4>
                    <div className="p-5 lg:p-10 rounded-3xl bg-darkblue shadow-xl mt-10">
                        <div className="grid grid-cols 1 lg:grid-cols-2 gap-10 lg:gap-20">
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <Icon
                                        icon="material-symbols:money-off"
                                        height={30}
                                        width={30}
                                        color="#13ba00"
                                    />
                                </div>
                                <h4 className="font-semibold text-2xl text-white mt-5">
                                    Gratis medlemsskab
                                </h4>
                                <p className="font-light text-white mt-4">
                                    Du opretter dig helt gratis og betaler ingen medlemsskab. Du kan
                                    købe leads når du har brug for det, og du betaler kun for de
                                    leads du selv køber. Du kan også vælge at købe leads hver dag,
                                    eller kun en gang om måneden. Det er helt op til dig. Det koster
                                    altså ingenting at være partner hos os.
                                </p>
                            </div>
                            <div className="text-white">
                                <div className="iconBoxLight shadow-xl">
                                    <Icon
                                        icon="solar:tag-price-linear"
                                        color="#13ba00"
                                        width="30"
                                        height="30"
                                    />
                                </div>
                                <h4 className="font-semibold text-2xl text-white mt-5">
                                    100 kr. pr. lead
                                </h4>
                                <p className="font-light text-white mt-4">
                                    Vi har 100% faste priser på vores lead. Vi har valgt at de skal
                                    koste 100kr fordi det giver os en lille avance på hvert lead i
                                    forhold til hvad vi bruger på markedsføring. Det betyder at vi
                                    kan holde prisen nede for dig, og stadig tjene lidt penge på
                                    det. Vi har ingen skjulte gebyrer eller lignende, og du betaler
                                    kun for de leads du selv køber.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="derfor">
                <div className="container">
                    <div>
                        <h4 className="font-bold leading-tight text-4xl text-darkblue">
                            Hvordan gør du?
                        </h4>
                    </div>
                    <div className="p-5 lg:p-10 rounded-3xl bg-white shadow-xl mt-10">
                        <div className="grid grid-cols 1 lg:grid-cols-2 gap-10 lg:gap-20">
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <h4 className="text-mygreen font-bold text-2xl"> 1 </h4>
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Opret dig
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Opret dig nemt og hurtigt med din email. Du skal ikke bruge
                                    NemID eller lignende. Du skal bare bruge din email, og så er du
                                    i gang. Du kan oprette dig med knappen i bunden af siden.
                                </p>
                            </div>
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <h4 className="text-mygreen font-bold text-2xl"> 2 </h4>
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Tjek leads
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Gå ind på siden Leads og se de leads vi har til dig. De leads du
                                    kan se er dem du kan købe, som endnu ikke er købt af andre. Hvis
                                    du har købt et lead, kan du se det under siden Mine leads. Du
                                    betaler 100 kr. hver gang du køber et lead.
                                </p>
                            </div>
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <h4 className="text-mygreen font-bold text-2xl"> 3 </h4>
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Kontakt kunden
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Når du har købt et lead, får du oplysningerne på kunden. Du kan
                                    nu kontakte kunden og aftale nærmere omkring at give dem et
                                    tilbud. Der er aldrig garanti for at kunden vælger dig, så du
                                    skal lave lidt salgsarbejde for at få kunden til at vælge dig.
                                </p>
                            </div>
                            <div className="text-darkblue">
                                <div className="iconBoxLight shadow-xl">
                                    <h4 className="text-mygreen font-bold text-2xl"> 4 </h4>
                                </div>
                                <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                    Udfør arbejdet
                                </h4>
                                <p className="font-light text-darkblue mt-4">
                                    Har du været en dygtig sælger og fået opgaven i hus er det nu
                                    blot at udføre arbejdet. Vi anbefaler at du hele tiden holder
                                    øje med leads og køber dem du synes er interessante. Så har du
                                    nemlig også arbejde til fremtiden.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="bg-green-500 p-10 rounded-3xl shadow-xl text-white text-center">
                        <h4 className="font-semibold leading-tight text-4xl text-white text-center">
                            Har du hørt nok?
                        </h4>
                        <button className="bg-white font-semibold mt-10 px-16 py-3 rounded-lg text-mygreen">
                            <Link href="/sign-up">Opret dig gratis</Link>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

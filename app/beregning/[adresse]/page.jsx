"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { calculator, updatePrice } from "@/app/utils/calculator";
import { createLead } from "@/app/utils/Serveractions/serverActions.js";
import { v4 as uuidv4 } from "uuid";
import va from "@vercel/analytics";
import { sendEmail } from "@/app/utils/Serveractions/serverActions.js";

const leadPriceId = uuidv4();

export default function Beregning({ params }) {
    const [loading, setLoading] = useState(true);
    const [adresse, setAdresse] = useState("");
    const [by, setBy] = useState("");
    const [postnummer, setPostnummer] = useState("");
    const [boligGrundPlan, setBoligGrundPlan] = useState(0);
    const [boligDataÅben, setBoligDataÅben] = useState(false);
    const [boligTagTypeTekst, setBoligTagTypeTekst] = useState("");
    const [nyTagType, setNyTagType] = useState(0);
    const [nyTagTypeTekst, setNyTagTypeTekst] = useState("");
    const [boligTagType, setBoligTagType] = useState(0);
    const [boligEtager, setBoligEtager] = useState(0);
    const [seBeregning, setSeBeregning] = useState(false);
    const [renoveringType, setRenoveringType] = useState("");
    const [fornavn, setFornavn] = useState("");
    const [efternavn, setEfternavn] = useState("");
    const [email, setEmail] = useState("");
    const [telefon, setTelefon] = useState("");
    const [tagVinkel, setTagVinkel] = useState(0);
    const [tagfladeareal, setTagfladeareal] = useState(0);
    const [højdeTilTagrende, setHøjdeTilTagrende] = useState(0);
    const [skorsten, setSkorsten] = useState(false);
    const [samletPris, setSamletPris] = useState(0);
    const [lavSamletPris, setLavSamletPris] = useState(0);
    const [højSamletPris, setHøjSamletPris] = useState(0);
    const [tagMalingPris, setTagMalingPris] = useState(0);
    const [kælder, setKælder] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const result = await calculator(params.adresse);
            setAdresse(result.adresse);
            setBy(result.by);
            setPostnummer(result.postnummer);
            setBoligGrundPlan(result.boligGrundPlan);
            setBoligTagType(result.boligTagType);
            setBoligEtager(result.etageAntal);
            setBoligTagTypeTekst(result.tagTypeTekst);
            setTagVinkel(result.tagVinkel);
            setTagfladeareal(result.tagFladeAreal);
            setHøjdeTilTagrende(result.højdeTilTagrende);
            setSamletPris(result.middelSamletPris);
            setLavSamletPris(result.lavSamletPris);
            setHøjSamletPris(result.højSamletPris);
            setTagMalingPris(result.tagMalingPris);
            setKælder(result.kælder);
            setLoading(result.loading);
        }
        fetchData();
    }, [params.adresse]);

    function handlePriceUpdate(nyTagType, tagVinkel, tagFladeAreal, skorsten) {
        updatePrice(nyTagType, tagVinkel, tagFladeAreal, skorsten).then((result) => {
            setSamletPris(result.middelSamletPris);
            setLavSamletPris(result.lavSamletPris);
            setHøjSamletPris(result.højSamletPris);
            setTagMalingPris(result.tagMalingPris);
            setTagfladeareal(result.tagFladeAreal);
            setNyTagTypeTekst(result.nyTagTypeTekst);
        });
    }

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="col-span-3 lg:col-span-1">
                            <div className="hidden lg:block bg-white rounded-xl p-5 shadow-xl">
                                <div className=" flex justify-between gap-5">
                                    <img
                                        src="https://asset.dr.dk/imagescaler01/https%3A%2F%2Fwww.dr.dk%2Fimages%2Fother%2F2015%2F04%2F18%2Fa236298c-17fa-4447-b907-0d955c327895_20140307-120447-a-1000x667-we.jpg&w=620"
                                        alt="rådgiverFoto"
                                        className="rådgiverFoto rounded-full object-cover my-auto"
                                    />
                                    <div>
                                        <p className="font-light text-sm">
                                            Din personlige rådgiver
                                        </p>
                                        <h4 className="font-bold text-lg lg:text-1xl">
                                            Martin Larsen
                                        </h4>
                                    </div>
                                    <div className="my-auto">
                                        <button className="px-2 lg:px-5 py-1 bg-mygreen rounded-lg text-white font-medium">
                                            Kontakt
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:hidden bg-white shadow-xl rounded-xl p-5 mt-5">
                                <div className="flex justify-between">
                                    <div className="my-auto">
                                        <h4 className="font-bold text-lg lg:text-2xl">
                                            Din boligdata
                                        </h4>
                                        <p className="font-light text-sm">Hentet fra BBR</p>
                                    </div>

                                    <div className="my-auto">
                                        <button
                                            onClick={() => setBoligDataÅben(!boligDataÅben)}
                                            className="px-3 lg:px-5 py-1 bg-mygreen-500 rounded-lg text-white font-medium">
                                            Se Boligdata
                                        </button>
                                    </div>
                                </div>
                                {boligDataÅben && (
                                    <div className="mt-5 flex flex-col gap-2">
                                        <div>
                                            <p className="font-light text-sm">Adresse</p>
                                            <p className="font-medium">{adresse}</p>
                                        </div>
                                        <div>
                                            <p className="font-light text-sm">Tagtype</p>
                                            <p className="font-medium">{boligTagTypeTekst}</p>
                                        </div>
                                        <div>
                                            <p className="font-light text-sm">Grundplansareal</p>
                                            <p className="font-medium">{boligGrundPlan}</p>
                                        </div>
                                        <div>
                                            <p className="font-light text-sm">
                                                Antal etager eksl. kælder
                                            </p>
                                            <p className="font-medium">{boligEtager}</p>
                                        </div>
                                        <div>
                                            <p className="font-light text-sm">
                                                Har kælder eller underetage
                                            </p>
                                            {kælder && <p className="font-medium">Ja</p>}
                                            {!kælder && <p className="font-medium">Nej</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="hidden lg:block bg-white shadow-xl rounded-xl p-5 mt-5">
                                <div className="mt-5">
                                    <h4 className="font-bold text-2xl">Din boligdata</h4>
                                    <p className="font-light text-sm">Hentet fra BBR</p>
                                </div>
                                <div className="mt-5 flex flex-col gap-2">
                                    <div>
                                        <p className="font-light text-sm">Adresse</p>
                                        <p className="font-medium">{adresse}</p>
                                    </div>
                                    <div>
                                        <p className="font-light text-sm">Tagtype</p>
                                        <p className="font-medium">{boligTagTypeTekst}</p>
                                    </div>
                                    <div>
                                        <p className="font-light text-sm">Grundplansareal</p>
                                        <p className="font-medium">{boligGrundPlan}</p>
                                    </div>

                                    <div>
                                        <p className="font-light text-sm">
                                            Antal etager eksl. kælder
                                        </p>
                                        <p className="font-medium">{boligEtager}</p>
                                    </div>
                                    <div>
                                        <p className="font-light text-sm">
                                            Har kælder eller underetage
                                        </p>
                                        {kælder && <p className="font-medium">Ja</p>}
                                        {!kælder && <p className="font-medium">Nej</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 lg:col-span-2 gap-5">
                            <div className="bg-white shadow-lg rounded-lg font-semibold text-lg w-full p-5 text-start flex justify-between align-middle">
                                <div className="my-auto">
                                    {seBeregning ? (
                                        <p>Skjul beregning og tilvalg</p>
                                    ) : (
                                        <p>Se beregning og tilvalg</p>
                                    )}
                                </div>

                                <div>
                                    {seBeregning ? (
                                        <button
                                            onClick={() => setSeBeregning(!seBeregning)}
                                            className="px-3 lg:px-5 py-1 bg-mygreen rounded-lg text-white font-medium">
                                            Skjul{" "}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setSeBeregning(!seBeregning)}
                                            className="px-3 lg:px-5 py-1 bg-mygreen rounded-lg text-white font-medium">
                                            Vis
                                        </button>
                                    )}
                                </div>
                            </div>

                            {seBeregning && (
                                <div className="mt-10">
                                    <div>
                                        <h2 className="font-bold text-2xl">Vores beregninger</h2>
                                        <p className="mt-5 w-full lg:w-9/12">
                                            Vores algoritmer har lavet nogle beregninger ud fra data
                                            vi har hentet om din bolig. Bekræft oplysningerne og se
                                            din pris på næste side.
                                        </p>
                                    </div>
                                    <div className=" mt-10">
                                        <h4 className="font-bold text-1xl">Din boligs tagvinkel</h4>
                                        <p className="text-sm lg:text-lg font-light">
                                            Vi har automatisk beregnet din tagvinkel. Er den ikke
                                            korrekt skal du rette den til den korrekte vinkel.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                                        <div
                                            onClick={() => {
                                                setTagVinkel(0);
                                                handlePriceUpdate(nyTagType, 0, 0, skorsten);
                                            }}
                                            className={`${
                                                tagVinkel == 0
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5  flex flex-col justify-end hover:scale-105 transition-all `}>
                                            <div className="flex flex-col gap-1">
                                                <div className="lavHældning mx-auto m-0"></div>
                                                <p className="font-semibold text-center my-auto mx-auto">
                                                    Fladt tag
                                                </p>
                                                <p className="font-light text-sm text-center">
                                                    0-5 grader
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setTagVinkel(25);
                                                handlePriceUpdate(nyTagType, 25, 0, skorsten);
                                            }}
                                            className={`${
                                                tagVinkel == 25
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5  flex flex-col justify-end hover:scale-105  transition-all  `}>
                                            <div className="flex flex-col gap-1">
                                                <svg
                                                    className="mx-auto my-auto"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="82"
                                                    height="21"
                                                    viewBox="0 0 82 21"
                                                    fill="none">
                                                    <path
                                                        d="M39.6907 0.453556C40.5388 0.159749 41.4612 0.15975 42.3093 0.453557L79.1639 13.2203C83.4261 14.6968 82.3653 21 77.8546 21H4.14541C-0.36533 21 -1.42613 14.6968 2.83612 13.2204L39.6907 0.453556Z"
                                                        fill="#13BA00"
                                                    />
                                                </svg>
                                                <p className="font-semibold text-center my-auto mx-auto">
                                                    Middel
                                                </p>
                                                <p className="font-light text-sm text-center">
                                                    Cirka 25 grader
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setTagVinkel(45);
                                                handlePriceUpdate(nyTagType, 45, 0, skorsten);
                                            }}
                                            className={`${
                                                tagVinkel == 45
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5  flex flex-col justify-end hover:scale-105  transition-all  `}>
                                            <div className="flex flex-col gap-1">
                                                <svg
                                                    className="my-auto mx-auto"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="104"
                                                    height="42"
                                                    viewBox="0 0 104 42"
                                                    fill="none">
                                                    <path
                                                        d="M49.7497 1.53118C51.1076 0.607206 52.8924 0.607204 54.2503 1.53118L101.883 33.943C105.139 36.1584 103.571 41.25 99.633 41.25H4.367C0.428937 41.25 -1.13906 36.1584 2.11675 33.943L49.7497 1.53118Z"
                                                        fill="#13BA00"
                                                    />
                                                </svg>
                                                <p className="font-semibold text-center my-auto mx-auto">
                                                    Høj
                                                </p>
                                                <p className="font-light text-sm text-center">
                                                    Cirka 45 grader
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" mt-10">
                                        <h4 className="font-bold text-1xl">Tagfladeareal</h4>
                                        <p className="text-sm lg:text-lg  font-light">
                                            Vi har automatisk beregnet dit tagfladeareal. Er det
                                            ikke korrekt skal du rette den til det korrekte areal.
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <div className="flex flex-col gap-10">
                                            <p className="font-semibold text-3xl">
                                                {tagfladeareal}{" "}
                                                <span className="text-sm font-light">
                                                    m2 tagflade
                                                </span>
                                            </p>
                                            <input
                                                min="0"
                                                max="500"
                                                onChange={(e) => {
                                                    setTagfladeareal(e.target.value);
                                                }}
                                                onClick={(e) => {
                                                    handlePriceUpdate(
                                                        nyTagType,
                                                        tagVinkel,
                                                        e.target.value,
                                                        skorsten
                                                    );
                                                }}
                                                value={tagfladeareal}
                                                type="range"
                                                className=" my-auto w-full lg:w-6/12 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className=" mt-10">
                                        <h4 className="font-bold text-1xl">Højde til tagrende</h4>
                                        <p className="text-sm lg:text-lg  font-light">
                                            Vi har automatisk beregnet højden til din tagrende fra
                                            jorden. Er det ikke korrekt skal du rette den til den
                                            korrekte højde.
                                        </p>
                                    </div>
                                    <div className="mt-5">
                                        <div className="flex flex-col gap-10">
                                            <p className="font-semibold text-3xl">
                                                {højdeTilTagrende}{" "}
                                                <span className="text-sm font-light">
                                                    meter til tagrende
                                                </span>
                                            </p>
                                            <input
                                                min="0"
                                                max="20"
                                                onChange={(e) =>
                                                    setHøjdeTilTagrende(e.target.value)
                                                }
                                                value={højdeTilTagrende}
                                                type="range"
                                                className=" my-auto w-full lg:w-6/12 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-20">
                                        <h2 className="font-bold text-2xl">Ekstra information</h2>
                                        <p className="mt-5 w-full  font-light">
                                            Nogle ting kan vi ikke vide, eller beregne. Udfyld de
                                            ekstra informationer for at få en mere præcis pris.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-3 mt-5">
                                        <div
                                            onClick={() => {
                                                setSkorsten(!skorsten);
                                                handlePriceUpdate(
                                                    nyTagType,
                                                    tagVinkel,
                                                    tagfladeareal,
                                                    !skorsten
                                                );
                                            }}
                                            className={`${
                                                skorsten
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <div className="flex flex-col gap-1">
                                                <svg
                                                    className="mx-auto"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="80"
                                                    height="80"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        fill="#13BA00"
                                                        d="M19 16h3L12 7L2 16h3l7-6.31L19 16M7 8.81V7H4v4.5l3-2.69Z"
                                                    />
                                                </svg>
                                                <p className="font-semibold text-center my-auto mx-auto">
                                                    Jeg har skorsten
                                                </p>
                                                <p className="font-light text-sm text-center">
                                                    Check af hvis du har en eller flere skorstene
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-20">
                                <h4 className="font-bold text-3xl">Hvad ønsker du pris på</h4>
                                <p className="mt-5 w-full font-light">
                                    Vælg den type renovering du ønsker at beregne pris på.
                                </p>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div
                                        onClick={() => setRenoveringType(1)}
                                        className={`${
                                            renoveringType == 1
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                        } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                        <div className="flex flex-col gap-1">
                                            <Icon
                                                className="mx-auto"
                                                icon="mdi:home-roof"
                                                height={100}
                                                color="#7ddb72"
                                            />
                                            <p className="font-semibold text-center my-auto mx-auto">
                                                Nyt tag
                                            </p>
                                            <p className="font-light text-sm text-center">
                                                Check af hvis du ønsker et nyt tag
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => {
                                            setRenoveringType(2);
                                            setNyTagTypeTekst("Tagmaling");
                                        }}
                                        className={`${
                                            renoveringType == 2
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                        } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                        <div className="flex flex-col gap-1">
                                            <Icon
                                                className="mx-auto"
                                                icon="bi:paint-bucket"
                                                height={100}
                                                color="#7ddb72"
                                            />
                                            <p className="font-semibold text-center my-auto mx-auto">
                                                Tagmaling
                                            </p>
                                            <p className="font-light text-sm text-center">
                                                Check af hvis du ønsker at dit tag skal males
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {renoveringType == 1 && (
                                <div className="mt-20">
                                    <h4 className="font-bold text-3xl">Vælg tagtype</h4>
                                    <p className="mt-5 w-full  font-light">
                                        Vælg den tagtype du ønsker at beregne pris på.
                                    </p>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                                        <div
                                            onClick={() => {
                                                setNyTagType(1);
                                                handlePriceUpdate(1, tagVinkel, tagfladeareal);
                                            }}
                                            className={`teglTag ${
                                                nyTagType == "1"
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <h4 className="text-center font-semibold text-lg">
                                                Tegltag
                                            </h4>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setNyTagType(2);
                                                handlePriceUpdate(
                                                    2,
                                                    tagVinkel,
                                                    tagfladeareal,
                                                    skorsten
                                                );
                                            }}
                                            className={`stålTag ${
                                                nyTagType == "2"
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <h4 className="text-center font-semibold text-lg">
                                                Ståltag
                                            </h4>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setNyTagType(3);
                                                handlePriceUpdate(
                                                    3,
                                                    tagVinkel,
                                                    tagfladeareal,
                                                    skorsten
                                                );
                                            }}
                                            className={`betonTegl ${
                                                nyTagType == "3"
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <h4 className="text-center font-semibold text-lg">
                                                Betontegl
                                            </h4>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setNyTagType(4);
                                                handlePriceUpdate(
                                                    4,
                                                    tagVinkel,
                                                    tagfladeareal,
                                                    skorsten
                                                );
                                            }}
                                            className={`tagPap ${
                                                nyTagType == "4"
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <h4 className="text-center font-semibold text-lg">
                                                Tagpap
                                            </h4>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setNyTagType(5);
                                                handlePriceUpdate(
                                                    5,
                                                    tagVinkel,
                                                    tagfladeareal,
                                                    skorsten
                                                );
                                            }}
                                            className={`eternit ${
                                                nyTagType == "5"
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <h4 className="text-center font-semibold text-lg">
                                                Eternit
                                            </h4>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setNyTagType(6);
                                                handlePriceUpdate(
                                                    6,
                                                    tagVinkel,
                                                    tagfladeareal,
                                                    skorsten
                                                );
                                            }}
                                            className={`stråTag ${
                                                nyTagType == "6"
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <h4 className="text-center font-semibold text-lg">
                                                Stråtag
                                            </h4>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setNyTagType(7);
                                                handlePriceUpdate(
                                                    7,
                                                    tagVinkel,
                                                    tagfladeareal,
                                                    skorsten
                                                );
                                            }}
                                            className={`levende ${
                                                nyTagType == "7"
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <h4 className="text-center font-semibold text-lg">
                                                Levendetag
                                            </h4>
                                        </div>
                                        <div
                                            onClick={() => {
                                                setNyTagType(8);
                                                handlePriceUpdate(
                                                    8,
                                                    tagVinkel,
                                                    tagfladeareal,
                                                    skorsten
                                                );
                                            }}
                                            className={`naturSkifer ${
                                                nyTagType == "8"
                                                    ? "bg-green-200 border-green-400 border-2"
                                                    : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <h4 className="text-center font-semibold text-lg">
                                                Naturskifer
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-20">
                                <h4 className="font-bold text-3xl">Udfyld dine informationer</h4>
                                <p className="mt-5 w-full  font-light">
                                    Udfyld dine informationer så vi kan gemme pris og så du kan
                                    finde den senere.
                                </p>
                            </div>
                            <form id="leadform" name="leadform">
                                <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
                                    <div>
                                        <label className="font-semibold">Fornavn</label>
                                        <input
                                            onChange={(e) => setFornavn(e.target.value)}
                                            value={fornavn}
                                            name="firstname"
                                            className="w-full bg-white shadow-lg border rounded-lg p-3 mt-2"
                                            placeholder="Indtast fornavn"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Efternavn</label>
                                        <input
                                            onChange={(e) => setEfternavn(e.target.value)}
                                            value={efternavn}
                                            name="lastname"
                                            className="w-full bg-white shadow-lg border rounded-lg p-3 mt-2"
                                            placeholder="Indtast efternavn"
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Telefon</label>
                                        <input
                                            onChange={(e) => setTelefon(e.target.value)}
                                            value={telefon}
                                            className="w-full bg-white shadow-lg border rounded-lg p-3 mt-2"
                                            placeholder="Indtast telefonnummer"
                                            type="tel"
                                        />
                                    </div>
                                    <div>
                                        <label className="font-semibold">Email</label>
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            className="w-full bg-white shadow-lg border rounded-lg p-3 mt-2"
                                            placeholder="Indtast email"
                                            type="email"
                                        />
                                    </div>
                                </div>
                                <p className="mt-8 text-center font-light text-sm opacity-50">
                                    Ved beregning af pris, accepterer du, at du får muligheden for
                                    at modtage 3 tilbud fra vores samarbejdspartnere. Du kan altid
                                    sige nej tak til tilbuddene.
                                </p>
                                <div className="mt-10">
                                    {fornavn.length > 2 &&
                                    efternavn.length > 4 &&
                                    email.match(
                                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                                    ) &&
                                    telefon.match(/^[0-9]{8}$/) ? (
                                        <Link href={`/pris?id=${leadPriceId}`}>
                                            <button
                                                type="submit"
                                                onClick={async () => {
                                                    va.track("GetPrice");
                                                    await createLead(
                                                        fornavn,
                                                        efternavn,
                                                        email,
                                                        telefon,
                                                        nyTagType,
                                                        nyTagTypeTekst,
                                                        boligTagType,
                                                        boligTagTypeTekst,
                                                        tagVinkel,
                                                        tagfladeareal,
                                                        skorsten,
                                                        lavSamletPris,
                                                        højSamletPris,
                                                        samletPris,
                                                        tagMalingPris,
                                                        højdeTilTagrende,
                                                        adresse,
                                                        boligGrundPlan,
                                                        leadPriceId,
                                                        by,
                                                        postnummer,
                                                        new Date().toLocaleString()
                                                    );
                                                    await sendEmail(nyTagTypeTekst, by);
                                                }}
                                                className="bg-mygreen p-5 font-semibold text-lg text-white rounded-lg w-full">
                                                Beregn pris
                                            </button>
                                        </Link>
                                    ) : (
                                        <div className="bg-gray-300 p-5 font-semibold text-lg text-center text-white rounded-lg w-full">
                                            Udfyld dine informationer
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

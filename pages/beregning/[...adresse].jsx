import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { calculator, updatePrice } from "../../lib/calculator";
import { createLead } from "../../lib/serveractions";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { event } from "nextjs-google-analytics";
import Seo from "../../components/Seo";
import { usePostHog, useFeatureFlagVariantKey } from 'posthog-js/react'
import LoadingModal from "../../components/LoadingModal";
import homeRoof from "../../assets/home-roof.svg";
import paintBucket from "../../assets/paint-bucket.svg";
import gutter from "../../assets/gutter.png";
import houseOutline from "../../assets/house-outline.svg";
import teglTag from "../../assets/tegltag.jpg";
import tagPap from "../../assets/tagpap.jpg";
import eternitTag from "../../assets/eternittag.jpg";
import straaTag from "../../assets/straatag.jpg";
import staalTag from "../../assets/staaltag.jpg";
import naturSkiferTag from "../../assets/naturskifer-tag.jpg";
import levendeTag from "../../assets/levende-tag.jpg";
import betonTegl from "../../assets/betontegl.jpeg";

const leadPriceId = uuidv4();

export default function Beregning({ params }) {
    const [loading, setLoading] = useState(true);
    const [adresse, setAdresse] = useState("");
    const [by, setBy] = useState("");
    const [postnummer, setPostnummer] = useState("");
    const [boligGrundPlan, setBoligGrundPlan] = useState(0);
    const [boligTagTypeTekst, setBoligTagTypeTekst] = useState("");
    const [nyTagType, setNyTagType] = useState(0);
    const [nyTagTypeTekst, setNyTagTypeTekst] = useState("");
    const [boligTagType, setBoligTagType] = useState(0);
    const [seBeregning, setSeBeregning] = useState(false);
    const [renoveringType, setRenoveringType] = useState("");
    const [tagVinkel, setTagVinkel] = useState(0);
    const [tagfladeareal, setTagfladeareal] = useState(0);
    const [hojdeTilTagrende, setHojdeTilTagrende] = useState(0);
    const [skorsten, setSkorsten] = useState(false);
    const [samletPris, setSamletPris] = useState(0);
    const [tagMalingPris, setTagMalingPris] = useState(0);
    const [tagrender, setTagrender] = useState(false);
    const [udhaeng, setUdhaeng] = useState(false);
    const [boligFound, setBoligFound] = useState(true);
    const [ctaState, setCtaState] = useState('Udregn Pris')
    const [tagAargang, setTagAargang] = useState(0);

    const router = useRouter();
    const posthog = usePostHog();
    const ctaVariant = useFeatureFlagVariantKey('test-flas');
    useEffect(() => {
        if (ctaVariant === 'test') {
            setCtaState('Beregn Pris')
        }
    }, [ctaVariant])

    useEffect(() => {
        event("Beregning", {
            category: "Beregning",
            label: 'Beregning',
        });
        posthog.capture('Beregning',
            {
                distinctId: leadPriceId,
            })
        if (router.isReady) {
            const urlPath = router.query.adresse;
            if (urlPath) {
                async function fetchData() {
                    // Get slug from url
                    const result = await calculator(urlPath);
                    if (!result.boligGrundPlan) {
                        setBoligFound(false);
                        setLoading(false);
                        return;
                    }
                    setAdresse(result.adresse);
                    setBy(result.by);
                    setPostnummer(result.postnummer);
                    setBoligGrundPlan(result.boligGrundPlan);
                    setBoligTagType(result.boligTagType);
                    setBoligTagTypeTekst(result.tagTypeTekst);
                    setTagVinkel(result.tagVinkel);
                    setTagfladeareal(result.tagFladeAreal);
                    setHojdeTilTagrende(result.højdeTilTagrende);
                    setSamletPris(result.middelSamletPris);
                    setTagMalingPris(result.tagMalingPris);
                    setTagAargang(result.tagAargang);
                    setLoading(result.loading);
                }
                fetchData();
            }
        }
    }, [router.query.adresse]);

    function handlePriceUpdate(nyTagType, tagVinkel, tagFladeAreal, skorsten, tagrender, udhaeng) {
        updatePrice(nyTagType, tagVinkel, tagFladeAreal, skorsten, tagrender, udhaeng).then(
            (result) => {
                setSamletPris(result.middelSamletPris);
                setTagMalingPris(result.tagMalingPris);
                setTagfladeareal(result.tagFladeAreal);
                setNyTagTypeTekst(result.nyTagTypeTekst);
            }
        );
    }

    // Create function for handling setting of renoveringType
    function handleRenoveringType(renoveringType) {
        setRenoveringType(renoveringType);
        if (renoveringType == 1) {
            event("nyt_tag", {
                category: "Beregning",
                label: 'Nyt tag',
            });
        } else if (renoveringType == 2) {
            event("tagmaling", {
                category: "Beregning",
                label: 'Tagmaling',
            });
        }
    }
    // Function to change submit button text to "Beregner din pris..."
    async function changeButtonText() {
        document.getElementById("submitButton").innerHTML = "Beregner din pris...";
    }
    if (!boligFound) return <div className="text-center my-24 font-bold">Vi kan desværre ikke udregne pris på din bolig. Prøv en anden adresse.</div>
    if (loading) return <LoadingModal text="Beregner boligdata..." />

    const formHtml = (
        <>
            <div className="mt-20">
            </div><form id="leadform" name="leadform">
                <div className="mt-10">
                    <button
                        type="submit"
                        id="submitButton"
                        onClick={async (e) => {
                            e.preventDefault();
                            event("GetPrice", {
                                category: "Lead",
                                label: 'GetPrice',
                            });
                            // Change button text
                            await changeButtonText();
                            await createLead(
                                nyTagType,
                                nyTagTypeTekst,
                                boligTagType,
                                boligTagTypeTekst,
                                tagVinkel,
                                tagfladeareal,
                                skorsten,
                                samletPris,
                                tagMalingPris,
                                hojdeTilTagrende,
                                adresse,
                                boligGrundPlan,
                                leadPriceId,
                                by,
                                postnummer,
                                udhaeng,
                                tagrender,
                                tagAargang,
                                new Date().toLocaleString()
                            );
                        }}
                        className="bg-mygreen p-5 font-semibold text-lg text-white rounded-lg w-full">
                        {ctaState}
                    </button>
                </div>
            </form></>
    );

    const boligDataHtml = (
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
                <p className="font-light text-sm">Tagfladeareal</p>
                <p className="font-medium">{tagfladeareal} m2</p>
            </div>
            <div>
                <p className="font-light text-sm">Højde til tagrende</p>
                <p className="font-medium">{hojdeTilTagrende} m</p>
            </div>
            <div>
                <p className="font-light text-sm">Tagvinkel</p>
                <p className="font-medium">{tagVinkel} grader</p>
            </div>
        </div>
    );

    return (
        <>
            <Seo title="Beregn pris på nyt tag eller tagmaling" description="Beregn pris på nyt tag eller tagmaling" />
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="col-span-3 lg:col-span-1">
                            <div className="lg:hidden bg-white shadow-xl rounded-xl p-5">
                                <div className="flex justify-between">
                                    <div className="my-auto">
                                        <h4 className="font-bold text-lg lg:text-2xl">
                                            Din boligdata
                                        </h4>
                                        <p className="font-light text-sm">Hentet fra BBR</p>
                                    </div>
                                </div>
                                {boligDataHtml}
                            </div>
                            <div className="hidden lg:block bg-white shadow-xl rounded-xl p-5">
                                <div className="">
                                    <h4 className="font-bold text-2xl">Din boligdata</h4>
                                    <p className="font-light text-sm">Hentet fra BBR</p>
                                </div>
                                {boligDataHtml}
                            </div>
                        </div>
                        <div className="col-span-3 lg:col-span-2 gap-5">
                            <div className="bg-white shadow-lg rounded-lg font-semibold text-lg w-full p-5 text-start flex justify-between align-middle">
                                <div className="my-auto">
                                    {seBeregning ? (
                                        <p>Skjul</p>
                                    ) : (
                                        <p>Ændre boligdata</p>
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
                                            className={`${tagVinkel == 0
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
                                            className={`${tagVinkel == 25
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
                                            className={`${tagVinkel == 45
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
                                                {hojdeTilTagrende}{" "}
                                                <span className="text-sm font-light">
                                                    meter til tagrende
                                                </span>
                                            </p>
                                            <input
                                                min="0"
                                                max="20"
                                                onChange={(e) =>
                                                    setHojdeTilTagrende(e.target.value)
                                                }
                                                value={hojdeTilTagrende}
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
                                            className={`${skorsten
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

                            <div className="mt-10">
                                <h4 className="font-bold text-3xl">Hvad ønsker du pris på</h4>
                                <p className="mt-5 w-full font-light">
                                    Vælg den type renovering du ønsker at beregne pris på.
                                </p>
                                <div className="grid grid-cols-2 gap-5 mt-5">
                                    <div
                                        onClick={() => handleRenoveringType(1)}
                                        className={`${renoveringType == 1
                                            ? "bg-green-200 border-green-400 border-2"
                                            : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                        <div className="flex flex-col gap-1">
                                            <Image
                                                src={homeRoof}
                                                alt="Tag på hus"
                                                className="mx-auto"
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
                                            handleRenoveringType(2);
                                            setNyTagTypeTekst("Tagmaling");
                                        }}
                                        className={`${renoveringType == 2
                                            ? "bg-green-200 border-green-400 border-2"
                                            : "bg-white"
                                            } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                        <div className="flex flex-col gap-1">
                                            <Image
                                                src={paintBucket}
                                                alt="Tagmaling"
                                                className="mx-auto"
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
                                            className={`${nyTagType == "1"
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                                } rounded-xl relative shadow-xl flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <Image
                                                src={teglTag}
                                                alt="Tegltag"
                                                className="rounded-xl w-full h-full object-cover"
                                                placeholder="blur"
                                            />
                                            <h4 className="center-in-div text-white">
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
                                            className={`${nyTagType == "2"
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                                } rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <Image
                                                src={staalTag}
                                                alt="Ståltag"
                                                className="rounded-xl w-full h-full object-cover"
                                                placeholder="blur"
                                            />
                                            <h4 className="center-in-div text-white">
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
                                            className={` ${nyTagType == "3"
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                                } rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <Image
                                                src={betonTegl}
                                                alt="Beton tegl"
                                                className="rounded-xl w-full h-full object-cover"
                                                placeholder="blur"
                                            />
                                            <h4 className="center-in-div text-white">
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
                                            className={`tagPap ${nyTagType == "4"
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                                } rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <Image
                                                src={tagPap}
                                                alt="Tagpap"
                                                className="rounded-xl w-full h-full object-cover"
                                                placeholder="blur"
                                            />
                                            <h4 className="center-in-div text-white">
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
                                            className={`eternit ${nyTagType == "5"
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                                } rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <Image
                                                src={eternitTag}
                                                alt="Eternit tag"
                                                className="rounded-xl w-full h-full object-cover"
                                                placeholder="blur"
                                            />
                                            <h4 className="center-in-div text-white">
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
                                            className={`stråTag ${nyTagType == "6"
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                                } rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <Image
                                                src={straaTag}
                                                alt="Stråtag"
                                                className="rounded-xl w-full h-full object-cover"
                                                placeholder="blur"
                                            />
                                            <h4 className="center-in-div text-white">
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
                                            className={`levende ${nyTagType == "7"
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                                } rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <Image
                                                src={levendeTag}
                                                alt="Levende tag"
                                                className="rounded-xl w-full h-full object-cover"
                                                placeholder="blur"
                                            />
                                            <h4 className="center-in-div text-white">
                                                Levende tag
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
                                            className={`naturSkifer ${nyTagType == "8"
                                                ? "bg-green-200 border-green-400 border-2"
                                                : "bg-white"
                                                } rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                            <Image
                                                src={naturSkiferTag}
                                                alt="Naturskifer tag"
                                                className="rounded-xl w-full h-full object-cover"
                                                placeholder="blur"
                                            />
                                            <h4 className="center-in-div text-white">
                                                Naturskifer
                                            </h4>
                                        </div>
                                    </div>
                                    {nyTagType > 0 && (
                                        <div className="mt-20">
                                            <h4 className="font-bold text-3xl">Vælg ekstra</h4>
                                            <p className="mt-5 w-full  font-light">
                                                Vælg om du også vil have nye tagrender og eller udhæng
                                                med i beregningen.
                                            </p>
                                            <div className="grid grid-cols-2 gap-5 mt-5">
                                                <div
                                                    onClick={() => {
                                                        handlePriceUpdate(
                                                            nyTagType,
                                                            tagVinkel,
                                                            tagfladeareal,
                                                            skorsten,
                                                            !tagrender,
                                                            udhaeng
                                                        );
                                                        setTagrender(!tagrender);
                                                    }}
                                                    className={`${tagrender == true
                                                        ? "bg-green-200 border-green-400 border-2"
                                                        : "bg-white"
                                                        } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                                    <div className="flex flex-col gap-1">
                                                        <Image
                                                            className="mx-auto"
                                                            alt="Tagrender"
                                                            src={gutter}
                                                            placeholder="blur"
                                                        />
                                                        <p className="font-semibold text-center my-auto mx-auto">
                                                            Tagrender
                                                        </p>
                                                        <p className="font-light text-sm text-center">
                                                            Check af hvis du ønsker nye tagrender
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setUdhaeng(!udhaeng);
                                                        handlePriceUpdate(
                                                            nyTagType,
                                                            tagVinkel,
                                                            tagfladeareal,
                                                            skorsten,
                                                            tagrender,
                                                            !udhaeng
                                                        );
                                                    }}
                                                    className={`${udhaeng == true
                                                        ? "bg-green-200 border-green-400 border-2"
                                                        : "bg-white"
                                                        } rounded-xl shadow-xl py-10 px-5 flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                                    <div className="flex flex-col gap-1">
                                                        <Image
                                                            className="mx-auto"
                                                            src={houseOutline}
                                                            alt="Udhæng"
                                                        />
                                                        <p className="font-semibold text-center my-auto mx-auto">
                                                            Udhæng
                                                        </p>
                                                        <p className="font-light text-sm text-center">
                                                            Check af hvis du ønsker nyt udhæng
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {(renoveringType == 1 && nyTagType) && formHtml || renoveringType == 2 && formHtml}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { event } from "nextjs-google-analytics";
import { useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import Seo from "../../components/Seo";
import MotionDiv from "../../components/MotionDiv";
import teglTag from "../../assets/tegltag.jpg";
import tagPap from "../../assets/tagpap.jpg";
import eternitTag from "../../assets/eternittag.jpg";
import straaTag from "../../assets/straatag.jpg";
import staalTag from "../../assets/staaltag.jpg";
import levendeTag from "../../assets/levende-tag.jpg";
import betonTegl from "../../assets/betontegl.jpeg";
import enTagflade from "../../assets/en-tagflade.jpg";
import toTagflader from "../../assets/2tagflader.jpg";
import fireTagflader from "../../assets/4tagflader.jpg";
import femTagflader from "../../assets/5tagflader.jpg";
import { motion } from "framer-motion";
import { addThousandsSeparator, beregnTagareal, calculateNewRoof, calculateRoofPrice, BBRData } from "../../lib/functions";
import { prisNedtagning } from "../../lib/prices";
import jydskTagTeknik from "../../assets/jydsk-tagteknik.png";
import trustpilot from "../../assets/trustpilot-4.5.png";
import router from "next/router";

const leadPriceId = uuidv4();

export default function Beregning() {
    const [loading, setLoading] = useState(true);
    const [tagAargang, setTagAargang] = useState(0);
    const [boligGrundPlan, setBoligGrundPlan] = useState(0);
    const [boligTagTypeTekst, setBoligTagTypeTekst] = useState("");
    const [adresse, setAdresse] = useState("");
    const [by, setBy] = useState("");
    const [postnummer, setPostnummer] = useState("");
    const [nyTagType, setNyTagType] = useState(null);
    const [nyTagTypeTekst, setNyTagTypeTekst] = useState("");
    const [boligTagType, setBoligTagType] = useState(null);
    const [tagVinkel, setTagVinkel] = useState(null);
    const [tagfladeareal, setTagfladeareal] = useState(0);
    const [tagFlader, setTagFlader] = useState(0);
    const [tagKviste, setTagKviste] = useState(0);
    const [newSkyLight, setNewSkyLight] = useState(0);
    const [newTagKviste, setNewTagKviste] = useState(0);
    const [hojdeTilTagrende, setHojdeTilTagrende] = useState(2.5);
    const [skorsten, setSkorsten] = useState(false);
    const [samletPris, setSamletPris] = useState(0);
    const [roofPrice, setRoofPrice] = useState(0);
    const [tagrender, setTagrender] = useState(false);
    const [udhaeng, setUdhaeng] = useState(false);
    const [boligFound, setBoligFound] = useState(true);
    const [step, setStep] = useState(1);
    const [secondStep, setSecondStep] = useState(1);
    const [showSelectTagType, setShowSelectTagType] = useState(false);
    const [showSelectBoligGrundPlan, setShowSelectBoligGrundPlan] = useState(false);
    const [showSelectTagVinkel, setShowSelectTagVinkel] = useState(false);
    const [showSelectHojdeTilTagrende, setShowSelectHojdeTilTagrende] = useState(false);
    const [showSelectTagKviste, setShowSelectTagKviste] = useState(false);
    const [showSelectNewTagKviste, setShowSelectNewTagKviste] = useState(false);
    const [showTagTjek, setShowTagTjek] = useState(false);
    const [showByggetilbud, setShowByggetilbud] = useState(false);
    const [tagTjek, setTagTjek] = useState(false);
    const [byggetilbud, setByggetilbud] = useState(false);
    const [showFinish, setShowFinish] = useState(false);

    const posthog = usePostHog();

    const searchParams = useSearchParams();
    const searchAdresse = searchParams.get("adresse");

    useEffect(() => {
        event("Beregning", {
            category: "Beregning",
            label: 'Beregning',
        });
        if (!searchAdresse) return setLoading(false), setShowSelectTagType(true), setSecondStep(2);
        async function fetchData() {
            const result = await BBRData(searchAdresse);
            if (!result.boligGrundPlan) {
                setBoligFound(false);
                setLoading(false);
                return;
            }
            setAdresse(result.adresse);
            setBy(result.by);
            setPostnummer(result.postnummer);
            setBoligGrundPlan(result.boligGrundPlan);
            setBoligTagType(result.tagType);
            setBoligTagTypeTekst(result.tagTypeTekst);
            setTagVinkel(result.tagVinkel);
            setTagfladeareal(result.tagFladeAreal);
            setHojdeTilTagrende(result.højdeTilTagrende);
            setSamletPris(result.middelSamletPris);
            setTagAargang(result.tagAargang);
            setSecondStep(1);
            setShowSelectTagType(false);
            setLoading(result.loading);
        }
        fetchData();
    }, [searchAdresse]);

    useEffect(() => {
        posthog.capture('Beregning',
            {
                distinctId: leadPriceId,
            })
    }, [posthog]);
    function toggleShowSelectTagType() {
        setShowSelectTagType(!showSelectTagType);
    }
    function toggleShowSelectBoligGrundPlan() {
        setShowSelectBoligGrundPlan(!showSelectBoligGrundPlan);
    }
    function toggleShowSelectTagVinkel() {
        setShowSelectTagVinkel(!showSelectTagVinkel);
    }
    function toggleShowSelectHojdeTilTagrende() {
        setShowSelectHojdeTilTagrende(!showSelectHojdeTilTagrende);
    }
    function chooseTagType(nyTagType) {
        setBoligTagType(nyTagType);
        switch (nyTagType) {
            case 5:
                setBoligTagTypeTekst("Tegltag");
                break;
            case 6:
                setBoligTagTypeTekst("Ståltag");
                break;
            case 4:
                setBoligTagTypeTekst("Betontegl");
                break;
            case 1:
                setBoligTagTypeTekst("Tagpap");
                break;
            case 3:
                setBoligTagTypeTekst("Eternit/Asbest");
                break;
            case 7:
                setBoligTagTypeTekst("Stråtag");
                break;
            case 20:
                setBoligTagTypeTekst("Levende tag");
                break;
            default:
                break;
        }
        toggleShowSelectTagType();
        if (!boligGrundPlan) {
            setShowSelectBoligGrundPlan(true);
        }
    }
    function changedRoof() {
        var nextStep = document.getElementById("changed-roof");
        nextStep.style.opacity = 100;
        nextStep.style.height = "auto";
        // Scroll to next step
        nextStep.scrollIntoView({ behavior: "smooth" });
    }
    function tagFladerFunction(e, tagFlader) {
        setTagFlader(tagFlader);
        setSecondStep(3);
    }
    function tagKvisteFunction(e, tagKviste) {
        setTagKviste(tagKviste);
        setSecondStep(4);
    }
    function newTagKvisteFunction(e, newTagKviste) {
        setNewTagKviste(newTagKviste);
        setSecondStep(5);
    }
    function tagRenderFunction(e, tagrender) {
        setTagrender(tagrender);
        setSecondStep(6);
    }
    function udhaengFunction(udhaeng) {
        setUdhaeng(udhaeng);
        let newRoof = calculateNewRoof(boligTagType, tagfladeareal, hojdeTilTagrende, tagKviste, newTagKviste, tagrender, udhaeng);
        setSamletPris(newRoof.pris);
        setSecondStep(2);
        setStep(3);
    }
    function copyText() {
        navigator.clipboard.writeText(`Jeg skal have udskiftet mit tag. Taget er fra ${tagAargang}. Tagarealet er på ${tagfladeareal} m2 og har en tagvinkel på ca. ${tagVinkel} grader. Der er ${hojdeTilTagrende} m til tagrende. Det gamle tag er ${boligTagTypeTekst} og skal skiftes til ${nyTagTypeTekst}. ${udhaeng && ("Tilbuddet skal også inkludere nyt udhæng. ")} ${tagrender && ("Tilbuddet skal også inkludere nye tagrender. ")}`);
        var succesElement = document.getElementById("succes-copy");
        succesElement.classList.remove("hidden");
        succesElement.classList.add("succes-message-copy");
        setTimeout(function () {
            succesElement.classList.remove("succes-message-copy");
            succesElement.classList.add("hidden");
        }, 2000);
    }
    function trackTilbudButton() {
        event("Tilbud - Klik", {
            category: "Tilbud",
            label: 'Tilbud',
        });
        posthog.capture('Tilbud - Klik', {
        });
    }
    function trackTagTjekButton() {
        event("Tagtjek - Klik", {
            category: "Tagtjek",
            label: 'Tagtjek',
        });
        posthog.capture('Tagtjek - Klik', {
        });
    }

    if (loading) return <div className="text-center my-24 font-bold">Indlæser beregner...</div>;
    if (!boligFound) return <div className="text-center my-24 font-bold">Vi kan desværre ikke udregne pris på din bolig. Prøv en anden adresse.</div>

    const boligDataHtml = (
        <div className="mt-5 flex flex-col gap-2 ">
            {adresse && (
                <div>
                    <p className="font-light text-sm">Adresse</p>
                    <p className="font-medium">{adresse}</p>
                </div>
            )}
            <div>
                <p className="font-light text-sm">Tagtype</p>
                <p className="font-medium">{boligTagTypeTekst ? (
                    boligTagTypeTekst
                ) : (
                    "Ikke angivet"
                )}<span onClick={toggleShowSelectTagType} className="edit-text">Ret</span></p>
            </div>
            {/* A hidden selector for roof type. Show when button is clicked */}
            {showSelectTagType && (
                <MotionDiv>
                    <div className="mb-4">
                        <p className="mt-5 w-full font-bold">
                            Vælg din nuværende tagtype
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                            <div
                                onClick={() => {
                                    chooseTagType(5);
                                }}
                                className={`bg-white rounded-xl relative shadow-xl flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                <Image
                                    src={teglTag}
                                    alt="Tegltag"
                                    className="rounded-xl w-full h-full object-cover"
                                    placeholder="blur"
                                />
                                <p className="text-xl center-in-div text-white">
                                    Tegltag
                                </p>
                            </div>
                            <div
                                onClick={() => {
                                    chooseTagType(6);
                                }}
                                className={`bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                <Image
                                    src={staalTag}
                                    alt="Ståltag"
                                    className="rounded-xl w-full h-full object-cover"
                                    placeholder="blur"
                                />
                                <p className="text-xl center-in-div text-white">
                                    Ståltag
                                </p>
                            </div>
                            <div
                                onClick={() => { chooseTagType(4); }}
                                className={`bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                <Image
                                    src={betonTegl}
                                    alt="Beton tegl"
                                    className="rounded-xl w-full h-full object-cover"
                                    placeholder="blur"
                                />
                                <p className="text-xl center-in-div text-white">
                                    Betontegl
                                </p>
                            </div>
                            <div
                                onClick={() => { chooseTagType(1); }}
                                className={`tagPap bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                <Image
                                    src={tagPap}
                                    alt="Tagpap"
                                    className="rounded-xl w-full h-full object-cover"
                                    placeholder="blur"
                                />
                                <p className="text-xl center-in-div text-white">
                                    Tagpap
                                </p>
                            </div>
                            <div
                                onClick={() => { chooseTagType(3); }}
                                className={`eternit bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                <Image
                                    src={eternitTag}
                                    alt="Eternit tag"
                                    className="rounded-xl w-full h-full object-cover"
                                    placeholder="blur"
                                />
                                <p className="text-xl center-in-div text-white">
                                    Eternit
                                </p>
                            </div>
                            <div
                                onClick={() => { chooseTagType(7); }}
                                className={`stråTag bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                <Image
                                    src={straaTag}
                                    alt="Stråtag"
                                    className="rounded-xl w-full h-full object-cover"
                                    placeholder="blur"
                                />
                                <p className="text-xl center-in-div text-white">
                                    Stråtag
                                </p>
                            </div>
                            <div
                                onClick={() => { chooseTagType(20); }}
                                className={`levende bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                <Image
                                    src={levendeTag}
                                    alt="Levende tag"
                                    className="rounded-xl w-full h-full object-cover"
                                    placeholder="blur"
                                />
                                <p className="text-xl center-in-div text-white">
                                    Levende
                                </p>
                            </div>
                        </div>
                    </div>
                </MotionDiv>
            )}
            <div>
                <p className="font-light text-sm">Boliggrundplan</p>
                <p className="font-medium">{boligGrundPlan > 0 ? (`${boligGrundPlan} m2`) : ('Ikke angivet')}<span onClick={toggleShowSelectBoligGrundPlan} className="edit-text">Ret</span></p>
            </div>
            {/* A hidden selector for boliggrundplan. Show when button is clicked */}
            {showSelectBoligGrundPlan && (
                <MotionDiv>
                    <div className="mb-5 text-center">
                        <p className="w-full font-bold">
                            Vælg din boligs grundplan
                        </p>
                        <div className="flex flex-col gap-10">
                            <p className="font-semibold text-3xl">
                                {boligGrundPlan}{" "}
                                <span className="text-sm font-light">
                                    m2 boliggrundplan
                                </span>
                            </p>
                            <input
                                min="0"
                                max="500"
                                value={boligGrundPlan}
                                onChange={(e) =>
                                    setBoligGrundPlan(e.target.value)
                                }
                                type="range"
                                className=" my-auto w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <button className="mt-6 bg-orange-500 p-3 text-sm font-semibold text-white rounded-lg" onClick={(e) => {
                            toggleShowSelectBoligGrundPlan();
                            if (!tagVinkel) setShowSelectTagVinkel(true);
                        }}>
                            Bekræft
                        </button>
                    </div>
                </MotionDiv>
            )}
            <div>
                <p className="font-light text-sm">Tagets hældning</p>
                <p className="font-medium">{tagVinkel ? (
                    `ca. ${tagVinkel} grader`) : (
                    "Ikke angivet"
                )} <span onClick={toggleShowSelectTagVinkel} className="edit-text">Ret</span></p>
            </div>
            {/* A hidden selector for roof angle. Show when button is clicked */}
            {showSelectTagVinkel && (
                <MotionDiv>
                    <p className="w-full font-bold">
                        Vælg dit tags hældning
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        <div
                            onClick={() => {
                                setTagVinkel(5);
                                toggleShowSelectTagVinkel();
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
                                toggleShowSelectTagVinkel();
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
                                    Ca. 25 grader
                                </p>
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                setTagVinkel(45);
                                toggleShowSelectTagVinkel();
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
                                    Ca. 45 grader
                                </p>
                            </div>
                        </div>
                    </div>
                </MotionDiv>
            )}
            <div>
                <p className="font-light text-sm">Højde til tagrende</p>
                <p className="font-medium">{hojdeTilTagrende}m<span onClick={toggleShowSelectHojdeTilTagrende} className="edit-text">Ret</span></p>
            </div>
            {/* A hidden selector for roof angle. Show when button is clicked */}
            {showSelectHojdeTilTagrende && (
                <MotionDiv className="text-center">
                    <p className="w-full font-bold">
                        Vælg din højde til tagrende
                    </p>
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
                            step="0.1"
                            onChange={(e) =>
                                setHojdeTilTagrende(e.target.value)
                            }
                            value={hojdeTilTagrende}
                            type="range"
                            className=" my-auto w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <button className="mt-6 bg-orange-500 p-3 text-sm font-semibold text-white rounded-lg" onClick={toggleShowSelectHojdeTilTagrende}>
                        Bekræft
                    </button>
                </MotionDiv>
            )}
        </div >
    );
    const questionsHtml = (
        <>
            {adresse && secondStep == 1 && (
                <MotionDiv>
                    <div className="mt-5 text-center" id="step2-q1">
                        <p className="mt-5 w-full font-bold">
                            Er det det originale tag eller er det blevet skiftet?
                        </p>
                        <div className="flex gap-4 place-content-center">
                            <button className="mt-6 border border-orange-500 p-3 text-sm font-semibold text-orange-500 rounded-lg" onClick={async (e) => { changedRoof(e) }}>
                                Skiftet
                            </button>
                            <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-mygreen rounded-lg" onClick={() => { setSecondStep(2) }}>
                                Original
                            </button>
                        </div>
                        <div className="opacity-0 h-0 transition-all" id="changed-roof">
                            <input type="number" placeholder="Hvilket år har i skiftet tag?" />
                            <button onClick={
                                async (e) => {
                                    // Change the tagAargang to the value of the input field
                                    setTagAargang(e.target.previousSibling.value);
                                    setSecondStep(2);
                                }
                            } className="mt-6 border border-mygreen p-3 text-sm font-semibold text-mygreen rounded-lg">
                                Bekræft
                            </button>
                        </div>
                    </div>
                </MotionDiv>
            )}
            {secondStep == 2 && (
                <MotionDiv>
                    <div className="mt-5 text-center" id="step2-q2">
                        <p className="mt-5 w-full font-bold">
                            Hvor mange tagflader har dit hus?
                        </p>
                        <div className="grid grid-cols-2 md:flex gap-4 place-content-center">
                            <div onClick={async (e) => {
                                tagFladerFunction(e, 1);
                            }
                            } className="mt-6 border bg-white py-3 px-5 text-sm font-semibold text-mygreen rounded-lg cursor-pointer">
                                <Image src={enTagflade} alt="1 tagflade" />
                                1
                            </div>
                            <div onClick={async (e) => {
                                tagFladerFunction(e, 2);
                            }
                            } className="mt-6 border bg-white py-3 px-5 text-sm font-semibold text-mygreen rounded-lg cursor-pointer">
                                <Image src={toTagflader} alt="2 tagflader" />
                                2
                            </div>
                            <div onClick={async (e) => {
                                tagFladerFunction(e, 4);
                            }
                            } className="mt-6 border bg-white py-3 px-5 text-sm font-semibold text-mygreen rounded-lg cursor-pointer">
                                <Image src={fireTagflader} alt="4 tagflader" />
                                4
                            </div>
                            <div onClick={async (e) => {
                                tagFladerFunction(e, 5);
                            }
                            } className="mt-6 border bg-white py-3 px-5 text-sm font-semibold text-mygreen rounded-lg cursor-pointer">
                                <Image src={femTagflader} alt="5 tagflader" />
                                5+
                            </div>
                        </div>
                    </div>
                </MotionDiv>
            )}
            {secondStep == 3 && (
                <MotionDiv>
                    <div className="mt-5 text-center" id="step2-q3">
                        <p className="mt-5 w-full font-bold">
                            Har dit hus skorsten, ovenlysvinduer eller tagkviste?
                        </p>
                        <p className="text-sm font-light">Skorstene, ovenlysvinduer og tagkviste øger omkostningen ved skift af tag. </p>
                        {!showSelectTagKviste ? (
                            <MotionDiv>
                                <div className="flex gap-4 place-content-center mt-6">
                                    <button onClick={async (e) => {
                                        tagKvisteFunction(e, 0);
                                    }}
                                        className="declineButton alt">
                                        Nej
                                    </button>
                                    <button onClick={
                                        () => {
                                            setShowSelectTagKviste(true);
                                        }
                                    }
                                        className="acceptButton alt">
                                        Ja
                                    </button>
                                </div>
                            </MotionDiv>
                        ) :
                            (
                                <MotionDiv>
                                    <p className="font-semibold my-4">Hvor mange?</p>
                                    <div className="flex gap-4 place-content-center">
                                        <button onClick={
                                            async (e) => {
                                                tagKvisteFunction(e, 1);
                                            }
                                        } className="acceptButton alt">
                                            1
                                        </button>
                                        <button onClick={
                                            async (e) => {
                                                tagKvisteFunction(e, 2);
                                            }
                                        } className="acceptButton alt">
                                            2
                                        </button>
                                        <button onClick={
                                            async (e) => {
                                                tagKvisteFunction(e, 3);
                                            }
                                        } className="acceptButton alt">
                                            3
                                        </button>
                                        <button onClick={
                                            async (e) => {
                                                tagKvisteFunction(e, 4);
                                            }
                                        } className="acceptButton alt">
                                            4+
                                        </button>
                                    </div>
                                </MotionDiv>
                            )}
                    </div>
                </MotionDiv>
            )
            }
            {secondStep == 4 && (
                <MotionDiv>
                    <div className="mt-5 text-center" id="step2-q4">
                        <p className="mt-5 w-full font-bold">
                            Ønsker du at få installeret nye ovenlysvinduer eller tagkviste?
                        </p>
                        {!showSelectNewTagKviste ? (
                            <MotionDiv>
                                <div className="flex gap-4 place-content-center mt-6">
                                    <button onClick={
                                        async (e) => {
                                            newTagKvisteFunction(e, 0);
                                        }
                                    } className="declineButton alt">
                                        Nej
                                    </button>
                                    <button onClick={
                                        () => {
                                            setShowSelectNewTagKviste(true);
                                        }
                                    } className="acceptButton alt">
                                        Ja
                                    </button>
                                </div>
                            </MotionDiv>
                        ) : (
                            <MotionDiv>
                                <p className="font-semibold my-4">Hvor mange?</p>
                                <div className="flex gap-4 place-content-center">
                                    <button onClick={
                                        async (e) => {
                                            newTagKvisteFunction(e, 1);
                                        }
                                    } className="acceptButton alt">
                                        1
                                    </button>
                                    <button onClick={
                                        async (e) => {
                                            newTagKvisteFunction(e, 2);
                                        }
                                    } className="acceptButton alt">
                                        2
                                    </button>
                                    <button onClick={
                                        async (e) => {
                                            newTagKvisteFunction(e, 3);
                                        }
                                    } className="acceptButton alt">
                                        3
                                    </button>
                                    <button onClick={
                                        async (e) => {
                                            newTagKvisteFunction(e, 4);
                                        }
                                    } className="acceptButton alt">
                                        4+
                                    </button>
                                </div>
                            </MotionDiv>
                        )}
                    </div>
                </MotionDiv>
            )}
            {secondStep == 5 && (
                <MotionDiv>
                    <div className="mt-5 text-center" id="step2-q5">
                        <p className="mt-5 w-full font-bold">
                            Vil du også have lavet nye tagrender?
                        </p>
                        <div className="flex gap-4 place-content-center mt-6">
                            <button onClick={
                                async (e) => {
                                    tagRenderFunction(e, false);
                                }
                            } className="declineButton alt">
                                Nej
                            </button>
                            <button onClick={
                                async (e) => {
                                    tagRenderFunction(e, true);
                                }
                            } className="acceptButton alt">
                                Ja
                            </button>
                        </div>
                    </div>
                </MotionDiv>
            )}
            {secondStep == 6 && (
                <MotionDiv>
                    <div className="mt-5 text-center" id="step2-q6">
                        <p className="mt-5 w-full font-bold">
                            Vil du også have lavet nyt udhæng?
                        </p>
                        <div className="flex gap-4 place-content-center mt-6">
                            <button onClick={
                                async () => {
                                    udhaengFunction(false);
                                }
                            } className="declineButton alt">
                                Nej
                            </button>
                            <button onClick={
                                async () => {
                                    udhaengFunction(true);
                                }
                            } className="acceptButton alt">
                                Ja
                            </button>
                        </div>
                    </div>
                </MotionDiv>
            )}
        </>
    )


    return (
        <>
            <Seo
                title="Beregn pris på nyt tag eller tagmaling"
                description="Beregn pris på nyt tag eller tagmaling"
                canonical="https://www.tagberegneren.dk/beregning"
            />
            <section>
                <div className="container">
                    <h1 className="text-center mb-6">Beregn pris på nyt tag</h1>
                    <div className="step-bar mb-8">
                        <div className="flex place-content-center">
                            <div
                                onClick={() => {
                                    setStep(1);
                                }}
                                className={`flex gap-2 cursor-pointer ${step >= 1
                                    ? "text-mygreen"
                                    : "text-gray-500"
                                    }`}>
                                {/* Show step circle indicator */}
                                <div className={`flex justify-center items-center rounded-full w-10 h-10 border-2 border-gray-500 ${step >= 1
                                    ? "border-mygreen"
                                    : ""
                                    }`}>
                                    <p className="text-lg">1</p>
                                </div>
                            </div>
                            {/* Show step line indicator */}
                            <div className={`flex justify-center items-center w-10 h-10
                                    : ""
                                    }`}>
                                <div className={`w-10 h-0.5  ${step > 1
                                    ? "bg-mygreen"
                                    : "bg-gray-500"
                                    }`}></div>
                            </div>
                            <div
                                onClick={() => {
                                    setStep(2);
                                    let tagAreal = beregnTagareal(tagVinkel, boligGrundPlan);
                                    setTagfladeareal(tagAreal);
                                }}
                                className={`flex gap-2 cursor-pointer ${step >= 2
                                    ? "text-mygreen"
                                    : "text-gray-500"
                                    }`}>
                                {/* Show step circle indicator */}
                                <div className={`flex justify-center items-center rounded-full w-10 h-10 border-2 border-gray-500 ${step >= 2
                                    ? "border-mygreen"
                                    : ""
                                    }`}>
                                    <p className="text-lg">2</p>
                                </div>
                            </div>
                            {/* Show step line indicator */}
                            <div className={`flex justify-center items-center w-10 h-10
                                    : ""
                                    }`}>
                                <div className={`w-10 h-0.5  ${step > 2
                                    ? "bg-mygreen"
                                    : "bg-gray-500"
                                    }`}></div>
                            </div>
                            {/* Show step circle indicator */}
                            <div onClick={() => {
                                setStep(3);
                            }}
                                className={`flex gap-2 cursor-pointer ${step >= 3
                                    ? "text-mygreen"
                                    : "text-gray-500"
                                    }`}>
                                <div className={`flex justify-center items-center rounded-full w-10 h-10 border-2 border-gray-500 ${step >= 3
                                    ? "border-mygreen"
                                    : ""
                                    }`}>
                                    <p className="text-lg">3</p>
                                </div>
                            </div>
                            <div className={`flex justify-center items-center w-10 h-10
                                    : ""
                                    }`}>
                                <div className={`w-10 h-0.5  ${step > 3
                                    ? "bg-mygreen"
                                    : "bg-gray-500"
                                    }`}></div>
                            </div>
                            <div
                                onClick={() => {
                                    setStep(4);
                                }}
                                className={`flex gap-2 cursor-pointer ${step >= 4
                                    ? "text-mygreen"
                                    : "text-gray-500"
                                    }`}>
                                <div className={`flex justify-center items-center rounded-full w-10 h-10 border-2 border-gray-500 ${step >= 4
                                    ? "border-mygreen"
                                    : ""
                                    }`}>
                                    <p className="text-lg">4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="max-w-xl mx-auto">
                        <div className="">
                            {step == 1 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="bg-white shadow-xl rounded-xl p-5 border border-gray-300">
                                    <div className="flex justify-between ">
                                        <div className="my-auto">
                                            <h3 className="font-bold text-lg lg:text-2xl">
                                                Trin 1 - Din boligdata
                                            </h3>
                                            {adresse && (
                                                <p className="font-light text-sm">
                                                    Vores algoritmer har lavet nogle beregninger ud fra data vi har hentet om din bolig. Bekræft oplysningerne for at fortsætte.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {boligDataHtml}
                                    <div className="mt-10">
                                        {!boligGrundPlan && (
                                            <p className="text-sm text-red-500">
                                                Du mangler at angive din boligs grundplan
                                            </p>
                                        )
                                        }
                                        {!tagVinkel && (
                                            <p className="text-sm text-red-500">
                                                Du mangler at angive din boligs taghældning
                                            </p>
                                        )
                                        }
                                        {!hojdeTilTagrende && (
                                            <p className="text-sm text-red-500">
                                                Du mangler at angive din boligs højde til tagrende
                                            </p>
                                        )
                                        }
                                        {!boligTagType && (
                                            <p className="text-sm text-red-500">
                                                Du mangler at angive din boligs tagtype
                                            </p>
                                        )
                                        }
                                        <button
                                            onClick={() => {
                                                setStep(2);
                                                let tagAreal = beregnTagareal(tagVinkel, boligGrundPlan);
                                                setTagfladeareal(tagAreal);
                                            }}
                                            className="bg-mygreen p-5 font-semibold text-lg text-white rounded-lg w-full"
                                            disabled={!boligGrundPlan || !tagVinkel || !hojdeTilTagrende || !boligTagType}
                                        >
                                            Bekræft boligdata
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                            {step == 2 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="bg-white shadow-xl rounded-xl p-5">
                                    <div className="col-span-3 lg:col-span-2 gap-5">
                                        <h2 className="font-bold text-xl lg:text-2xl">
                                            Trin 2 - Spørgsmål
                                        </h2>
                                        {questionsHtml}
                                    </div>
                                </motion.div>
                            )}
                            {step == 3 && (
                                <MotionDiv>
                                    <div className="bg-white shadow-xl rounded-xl p-5">
                                        <MotionDiv>
                                            <div className="flex justify-between ">
                                                <div className="my-auto">
                                                    <h3 className="font-bold text-lg lg:text-2xl">
                                                        Trin 3 - Vælg tagtype
                                                    </h3>
                                                    <p className="font-light text-sm">
                                                        Vi er klar til at beregne din pris.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <p className="mt-5 w-full font-bold">
                                                    Vælg ønsket ny tagtype
                                                </p>
                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                                                    <div
                                                        onClick={() => {
                                                            setNyTagType(1);
                                                            let roofPrice = calculateRoofPrice(tagfladeareal, 1);
                                                            setRoofPrice(roofPrice);
                                                            setNyTagTypeTekst("Tegltag");
                                                        }}
                                                        className={`${nyTagType == 1 && ('overlay-green')} bg-white rounded-xl relative shadow-xl flex flex-col justify-end hover:scale-105 transition-all w-full`}>
                                                        <Image
                                                            src={teglTag}
                                                            alt="Tegltag"
                                                            className={`rounded-xl w-full h-full object-cover ${nyTagType == 1 && ('opacity-80')}`}
                                                            placeholder="blur"
                                                        />
                                                        <p className="text-xl center-in-div text-white">
                                                            Tegltag
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setNyTagType(2);
                                                            let roofPrice = calculateRoofPrice(tagfladeareal, 2);
                                                            setRoofPrice(roofPrice);
                                                            setNyTagTypeTekst("Ståltag");
                                                        }}
                                                        className={`bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full ${nyTagType == 2 && ('overlay-green')}`}>
                                                        <Image
                                                            src={staalTag}
                                                            alt="Ståltag"
                                                            className={`rounded-xl w-full h-full object-cover ${nyTagType == 2 && ('opacity-80')}`}
                                                            placeholder="blur"
                                                        />
                                                        <p className="text-xl center-in-div text-white">
                                                            Ståltag
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setNyTagType(3);
                                                            let roofPrice = calculateRoofPrice(tagfladeareal, 3);
                                                            setRoofPrice(roofPrice);
                                                            setNyTagTypeTekst("Betontegl");
                                                        }}
                                                        className={`bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full ${nyTagType == 3 && ('overlay-green')}`}>
                                                        <Image
                                                            src={betonTegl}
                                                            alt="Beton tegl"
                                                            className={`rounded-xl w-full h-full object-cover ${nyTagType == 3 && ('opacity-80')}`}
                                                            placeholder="blur"
                                                        />
                                                        <p className="text-xl center-in-div text-white">
                                                            Betontegl
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setNyTagType(4);
                                                            let roofPrice = calculateRoofPrice(tagfladeareal, 4);
                                                            setRoofPrice(roofPrice);
                                                            setNyTagTypeTekst("Tagpap");
                                                        }}
                                                        className={`tagPap bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full ${nyTagType == 4 && ('overlay-green')}`}>
                                                        <Image
                                                            src={tagPap}
                                                            alt="Tagpap"
                                                            className={`rounded-xl w-full h-full object-cover ${nyTagType == 4 && ('opacity-80')}`}
                                                            placeholder="blur"
                                                        />
                                                        <p className="text-xl center-in-div text-white">
                                                            Tagpap
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setNyTagType(5);
                                                            let roofPrice = calculateRoofPrice(tagfladeareal, 5);
                                                            setRoofPrice(roofPrice);
                                                            setNyTagTypeTekst("Eternit");
                                                        }}
                                                        className={`eternit bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full ${nyTagType == 5 && ('overlay-green')}`}>
                                                        <Image
                                                            src={eternitTag}
                                                            alt="Eternit tag"
                                                            className={`rounded-xl w-full h-full object-cover ${nyTagType == 5 && ('opacity-80')}`}
                                                            placeholder="blur"
                                                        />
                                                        <p className="text-xl center-in-div text-white">
                                                            Eternit
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setNyTagType(6);
                                                            let roofPrice = calculateRoofPrice(tagfladeareal, 6);
                                                            setRoofPrice(roofPrice);
                                                            setNyTagTypeTekst("Stråtag");
                                                        }}
                                                        className={`stråTag bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full ${nyTagType == 6 && ('overlay-green')}`}>
                                                        <Image
                                                            src={straaTag}
                                                            alt="Stråtag"
                                                            className={`rounded-xl w-full h-full object-cover ${nyTagType == 6 && ('opacity-80')}`}
                                                            placeholder="blur"
                                                        />
                                                        <p className="text-xl center-in-div text-white">
                                                            Stråtag
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={() => {
                                                            setNyTagType(7);
                                                            let roofPrice = calculateRoofPrice(tagfladeareal, 7);
                                                            setRoofPrice(roofPrice);
                                                            setNyTagTypeTekst("Levende");
                                                        }}
                                                        className={`levende bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full ${nyTagType == 7 && ('overlay-green')}`}>
                                                        <Image
                                                            src={levendeTag}
                                                            alt="Levende tag"
                                                            className={`rounded-xl w-full h-full object-cover ${nyTagType == 7 && ('opacity-80')}`}
                                                            placeholder="blur"
                                                        />
                                                        <p className="text-xl center-in-div text-white">
                                                            Levende
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {roofPrice > 0 && (
                                                <div className="mt-5">
                                                    <div className="mt-10">
                                                        <button
                                                            onClick={() => {
                                                                setStep(4);
                                                                setByggetilbud(true);
                                                                // Scroll to top
                                                                window.scrollTo(0, 0);
                                                                // After 3 seconds set tagTjek to true
                                                                setTimeout(() => {
                                                                    setTagTjek(true);
                                                                }, 1500);
                                                            }}
                                                            className="bg-mygreen p-5 font-semibold text-lg text-white rounded-lg w-full">
                                                            Fortsæt
                                                        </button>
                                                    </div>
                                                </div>

                                            )}
                                        </MotionDiv>

                                    </div>
                                </MotionDiv>
                            )}
                            {step == 4 && (
                                <MotionDiv>
                                    {tagTjek && (
                                        <MotionDiv>
                                            <div className="bg-white rounded-xl shadow-lg border text-base p-4 mt-5 md:mt-10">
                                                <h3 className="font-semibold mb-4">Du er kvalificeret til et gratis tagtjek</h3>
                                                <p className="font-light">På baggrund af dine oplysninger, kan vi i samarbejde med <strong>Jydsk Tagteknik</strong> tilbyde dig et gratis tagtjek til en værdi af <strong>2.995,-</strong></p>
                                                {!showTagTjek && (
                                                    <div className="buttons">
                                                        <div className="flex justify-center mt-5 gap-4">
                                                            <button onClick={
                                                                () => {
                                                                    setTagTjek(false);
                                                                    setByggetilbud(true);
                                                                }
                                                            } className="declineButton">Afvis</button>
                                                            <button onClick={
                                                                () => {
                                                                    setShowTagTjek(true);
                                                                }
                                                            } className="bg-mygreen hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">Læs mere</button>
                                                        </div>
                                                    </div>
                                                )}
                                                {showTagTjek && (
                                                    <MotionDiv>
                                                        <p className="font-semibold my-4">Få styr på skaderne i tide og undgå dyre regninger</p>
                                                        <p className="font-light mb-4">Dit tag vil blive gennemgået og vurderet om det er i orden eller om der er brug for en mindre reparation, en renovering eller en udskiftning.</p>
                                                        <p className="my-4 font-semibold">Tagtjekket og efterfølgende tilbud er 100% uforpligtende. Tryk på knappen herunder for at bestille dit tagtjek.</p>
                                                        <div className="flex justify-center mt-5">
                                                            <div className="acceptButton">
                                                                <a onClick={
                                                                    () => {
                                                                        trackTagTjekButton();
                                                                        setTagTjek(false);
                                                                        setByggetilbud(true);
                                                                        // Scroll to element with id byggetilbud
                                                                    }
                                                                } href="/gratistagtjek/" target="_blank">Bestil dit gratis tagtjek</a>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <h4 className="mb-4">Om Jydsk Tagteknik</h4>
                                                            <p className="font-light">Jydsk Tagteknik er en af danmarks førende tagfirmaer og har flere gange vundet prisen som årets tagfirma. De er dækket af Håndværkerens Tryghedsgaranti og dækker hele danmark</p>
                                                            <div className="flex flex-col md:flex-row justify-center place-items-center mt-4 p-4">
                                                                <Image src={jydskTagTeknik} alt="Jydsk Tagteknik - Logo" placeholder="blur" />
                                                                <Image src={trustpilot} alt="Trustpilot - 4.5 Stjerner" placeholder="blur" />
                                                            </div>
                                                        </div>
                                                    </MotionDiv>
                                                )}
                                            </div>
                                        </MotionDiv>
                                    )}

                                    <div className="bg-white shadow-xl rounded-xl p-5 mt-5 md:mt-10">
                                        <div className="flex justify-between ">
                                            <div className="my-auto">
                                                <h3>
                                                    Din pris og næste skridt
                                                </h3>
                                                <h4 className="my-4">Prisoverslag</h4>
                                                <div className="flex justify-between">
                                                    <p className="font-light text-sm">
                                                        Nedtagning - {boligTagTypeTekst} - {tagfladeareal} m2
                                                    </p>
                                                    <p className="text-sm">
                                                        {addThousandsSeparator(prisNedtagning * tagfladeareal)} kr.
                                                    </p>
                                                </div>
                                                {tagKviste > 0 && (
                                                    <div className="flex justify-between">
                                                        <p className="font-light text-sm">
                                                            Tagkviste, skorsten, ovenlysvinduer
                                                        </p>
                                                        <p className="text-sm">
                                                            {addThousandsSeparator(5000 * tagKviste)} kr.
                                                        </p>
                                                    </div>
                                                )}
                                                {newTagKviste > 0 && (
                                                    <div className="flex justify-between">
                                                        <p className="font-light text-sm">
                                                            Nye tagkviste/ovenlysvinduer
                                                        </p>
                                                        <p className="text-sm">
                                                            {addThousandsSeparator(20000 * newTagKviste)} kr.
                                                        </p>
                                                    </div>
                                                )}
                                                {tagrender && (
                                                    <div className="flex justify-between">
                                                        <p className="font-light text-sm">
                                                            Nye tagrender
                                                        </p>
                                                        <p className="text-sm">
                                                            {addThousandsSeparator(18000)} kr.
                                                        </p>
                                                    </div>
                                                )}
                                                {udhaeng && (
                                                    <div className="flex justify-between">
                                                        <p className="font-light text-sm">
                                                            Nyt udhæng
                                                        </p>
                                                        <p className="text-sm">
                                                            {addThousandsSeparator(15000)} kr.
                                                        </p>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <p className="font-light text-sm">
                                                        Nyt tag - {nyTagTypeTekst} - {tagfladeareal} m2
                                                    </p>
                                                    <p className="text-sm">
                                                        {addThousandsSeparator(roofPrice)} kr.
                                                    </p>
                                                </div>
                                                <div className="flex justify-between text-secondary my-4 font-bold">
                                                    <p className="text-lg">
                                                        Samlet pris
                                                    </p>
                                                    <p className="text-lg">
                                                        {addThousandsSeparator((roofPrice + samletPris))} kr.
                                                    </p>
                                                </div>
                                                <p className="font-light text-sm">
                                                    Dette er en vejledende pris. Din faktiske pris kan svinge efter valgt håndværker og dit tags beskaffenhed.
                                                </p>
                                                <p className="text-base font-semibold mt-5">
                                                    Vi anbefaler at indhente tilbud på dit projekt for at få en præcis pris.
                                                </p>
                                                {showFinish && (
                                                    <MotionDiv>
                                                        <div className="flex justify-center">
                                                            <button onClick={
                                                                () => {
                                                                    // Go to front page
                                                                    router.push('/');
                                                                }
                                                            } className="declineButton my-5">Afslut</button>
                                                        </div>
                                                    </MotionDiv>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {byggetilbud && (
                                        <MotionDiv>
                                            <div id="byggetilbud" className="bg-white rounded-xl shadow-lg border text-base p-4 md:mt-10 mt-5">
                                                <h3 className="font-semibold mb-5">Få tilbud på dit tagprojekt</h3>
                                                <p className="font-light mb-2">I samarbejde med <strong>3byggetilbud</strong> kan vi tilbyde dig at få 3 tilbud på dit tagprojekt.</p>
                                                <p className="font-semibold">Det er helt gratis og uforpligtende for dig at modtage tilbud. Du vælger selv, om du vil acceptere et af tilbuddene.</p>
                                                {!showByggetilbud && (
                                                    <div className="buttons">
                                                        <div className="flex justify-center mt-5 gap-4">
                                                            <button onClick={
                                                                () => {
                                                                    setByggetilbud(false);
                                                                    setShowFinish(true);
                                                                }
                                                            } className="declineButton">Afvis</button>
                                                            <button onClick={
                                                                () => {
                                                                    setShowByggetilbud(true);
                                                                }
                                                            } className="bg-mygreen hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">Læs mere</button>
                                                        </div>
                                                    </div>
                                                )}
                                                {showByggetilbud && (
                                                    <MotionDiv>
                                                        <p className="font-semibold mt-5 mb-2">Fordele ved 3byggetilbud:</p>
                                                        <ol className="list-decimal list-inside text-lg mb-5 ml-4">
                                                            <li>Det er gratis og uforpligtende</li>
                                                            <li>Spar tid og penge</li>
                                                            <li>Personlig vejledning</li>
                                                            <li>Entreprisegaranti</li>
                                                        </ol>
                                                        <p className="font-semibold">For at gøre det nemt for dig har vi klargjort en opgavebeskrivelse på baggrund af dine informationer:</p>
                                                        <div className="bg-gray-100 rounded-lg p-5 mt-5">
                                                            <p className="font-semibold">Opgavebeskrivelse:</p>
                                                            <p className="font-light">Jeg skal have udskiftet mit tag. {tagAargang && `Taget er fra ${tagAargang}. `}Tagarealet er på {tagfladeareal} m2 og har en tagvinkel på ca. {tagVinkel} grader. Der er {hojdeTilTagrende} m til tagrende. Det gamle tag er {boligTagTypeTekst} og skal skiftes til {nyTagTypeTekst}. {udhaeng && ("Tilbuddet skal også inkludere nyt udhæng. ")} {tagrender && ("Tilbuddet skal også inkludere nye tagrender. ")}</p>
                                                            {/* Button to copy above text */}
                                                            <div className="flex justify-center mt-5 relative">
                                                                <div onClick={copyText} className="bg-gray-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm cursor-pointer">
                                                                    Kopier opgavebeskrivelse
                                                                </div>
                                                                {/* Insert succes message after copying text. It should show a text just above the button for 2 seconds */}
                                                                <div className="hidden transition-all" id="succes-copy">
                                                                    <p>Kopieret!</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-center mt-5">
                                                            <div className="bg-mygreen hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm">
                                                                <a onClick={
                                                                    () => {
                                                                        trackTilbudButton();
                                                                        setByggetilbud(false);
                                                                        setShowFinish(true);
                                                                    }
                                                                } href="/3byggetilbud/" target="_blank">Få 3 gratis tilbud</a>
                                                            </div>
                                                        </div>
                                                    </MotionDiv>
                                                )}
                                            </div>
                                        </MotionDiv>
                                    )}

                                </MotionDiv>
                            )}
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}

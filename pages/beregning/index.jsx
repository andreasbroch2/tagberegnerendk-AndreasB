import { useEffect, useState } from "react";
import { calculator, updatePrice } from "../../lib/calculator";
import { createLead } from "../../lib/serveractions";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { event } from "nextjs-google-analytics";
import { useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import Seo from "../../components/Seo";
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

    const searchParams = useSearchParams();
    const searchAdresse = searchParams.get("adresse");
    const [tagAargang, setTagAargang] = useState(0);
    const [boligGrundPlan, setBoligGrundPlan] = useState(0);
    const [boligTagTypeTekst, setBoligTagTypeTekst] = useState("");
    const [adresse, setAdresse] = useState("");
    const [by, setBy] = useState("");
    const [postnummer, setPostnummer] = useState("");
    const [nyTagType, setNyTagType] = useState(0);
    const [boligTagType, setBoligTagType] = useState(0);
    const [nyTagTypeTekst, setNyTagTypeTekst] = useState("");
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
    const [step, setStep] = useState(1);
    const [showSelectTagType, setShowSelectTagType] = useState(false);
    const [showSelectBoligGrundPlan, setShowSelectBoligGrundPlan] = useState(false);
    const [showSelectTagVinkel, setShowSelectTagVinkel] = useState(false);
    const [showSelectHojdeTilTagrende, setShowSelectHojdeTilTagrende] = useState(false);

    const posthog = usePostHog();

    useEffect(() => {
        if (!searchAdresse) return;
        event("Beregning", {
            category: "Beregning",
            label: 'Beregning',
        });
        posthog.capture('Beregning',
            {
                distinctId: leadPriceId,
            })
        async function fetchData() {
            // Get slug from url
            const result = await calculator(searchAdresse);
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
            setLoading(result.loading);
            setTagAargang(result.tagAargang);
        }
        fetchData();
    }, [searchAdresse]);
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
    function originalRoof(e){
        // Change background color of button
        e.target.style.backgroundColor = "#13BA0050";
        var nextStep = document.getElementById("step2-q2");
        var prevStep = document.getElementById("step2-q1");
        nextStep.style.opacity = 100;
        nextStep.style.height = "auto";
        // Scroll to next step
        nextStep.scrollIntoView({ behavior: "smooth" });
        // White out previous step
        prevStep.style.opacity = 0.3;
    }
    function changedRoof(){
        var nextStep = document.getElementById("changed-roof");
        nextStep.style.opacity = 100;
        nextStep.style.height = "auto";
        // Scroll to next step
        nextStep.scrollIntoView({ behavior: "smooth" });
    }

    if (loading) return <div className="text-center my-24 font-bold">Beregner boligdata...</div>;
    if (!boligFound) return <div className="text-center my-24 font-bold">Vi kan desværre ikke udregne pris på din bolig. Prøv en anden adresse.</div>

    const formHtml = (
        <>
        <Seo
            title="Din beregning - TagBeregneren.dk"
            description="Beregn pris på nyt tag eller tagmaling. Gennemfør formularen for at få din pris."
            canonical="https://www.tagberegneren.dk/beregning"
        />
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
                                new Date().toLocaleString()
                            );
                        }}
                        className="bg-mygreen p-5 font-semibold text-lg text-white rounded-lg w-full">
                        Beregn din pris
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
                <p className="font-medium">{boligTagTypeTekst}<span onClick={toggleShowSelectTagType} className="text-orange-500 float-right font-light text-sm">Ret</span></p>
            </div>
            {/* A hidden selector for roof type. Show when button is clicked */}
            <div className={`${showSelectTagType ? "block" : "hidden"} transition-all`}>
                <div className="mb-4">
                    <p className="mt-5 w-full font-bold">
                        Vælg din nuværende tagtype
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
                        <div
                            onClick={() => {
                                setBoligTagType(5);
                                setBoligTagTypeTekst("Tegltag");
                                toggleShowSelectTagType();
                            }}
                            className={`bg-white rounded-xl relative shadow-xl flex flex-col justify-end hover:scale-105 transition-all w-full`}>
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
                                setBoligTagType(6);
                                setBoligTagTypeTekst("Ståltag");
                                toggleShowSelectTagType();
                            }}
                            className={`bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
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
                                setBoligTagType(4);
                                setBoligTagTypeTekst("Betontegl");
                                toggleShowSelectTagType();
                            }}
                            className={`bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
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
                                setBoligTagType(1);
                                setBoligTagTypeTekst("Tagpap");
                                toggleShowSelectTagType();
                            }}
                            className={`tagPap bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
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
                                setBoligTagType(5);
                                setBoligTagTypeTekst("Eternit");
                                toggleShowSelectTagType();
                            }}
                            className={`eternit bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
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
                                setBoligTagType(7);
                                setBoligTagTypeTekst("Stråtag");
                                toggleShowSelectTagType();
                            }}
                            className={`stråTag bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
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
                                setBoligTagType(20);
                                setBoligTagTypeTekst("Levende tag");
                                toggleShowSelectTagType();
                            }}
                            className={`levende bg-white rounded-xl shadow-xl relative flex flex-col justify-end hover:scale-105 transition-all w-full`}>
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
            </div>
            <div>
                <p className="font-light text-sm">Boliggrundplan</p>
                <p className="font-medium">{boligGrundPlan} m2<span onClick={toggleShowSelectBoligGrundPlan} className="text-orange-500 float-right font-light text-sm">Ret</span></p>
            </div>
            {/* A hidden selector for boliggrundplan. Show when button is clicked */}
            <div className={`${showSelectBoligGrundPlan ? "block" : "hidden"} transition-all`}>
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
                            onChange={(e) => {
                                setBoligGrundPlan(e.target.value);
                            }}
                            value={boligGrundPlan}
                            type="range"
                            className=" my-auto w-full lg:w-6/12 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <button className="mt-6 bg-orange-500 p-3 text-sm font-semibold text-white rounded-lg" onClick={toggleShowSelectBoligGrundPlan}>
                        Bekræft
                    </button>
                </div>
            </div>
            <div>
                <p className="font-light text-sm">Tagets hældning</p>
                <p className="font-medium">ca. {tagVinkel} grader<span onClick={toggleShowSelectTagVinkel} className="text-orange-500 float-right font-light text-sm">Ret</span></p>
            </div>
            {/* A hidden selector for roof angle. Show when button is clicked */}
            <div className={`${showSelectTagVinkel ? "block" : "hidden"} transition-all`}>
                <p className="w-full font-bold">
                    Vælg dit tags hældning
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                    <div
                        onClick={() => {
                            setTagVinkel(0);
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
                                Cirka 25 grader
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
                                Cirka 45 grader
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p className="font-light text-sm">Højde til tagrende</p>
                <p className="font-medium">{hojdeTilTagrende}m<span onClick={toggleShowSelectHojdeTilTagrende} className="text-orange-500 float-right font-light text-sm">Ret</span></p>
            </div>
            {/* A hidden selector for roof angle. Show when button is clicked */}
            <div className={`${showSelectHojdeTilTagrende ? "block" : "hidden"} transition-all text-center`}>
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
                        className=" my-auto w-full lg:w-6/12 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <button className="mt-6 bg-orange-500 p-3 text-sm font-semibold text-white rounded-lg" onClick={toggleShowSelectHojdeTilTagrende}>
                    Bekræft
                </button>
            </div>
        </div>
    );
    const questionsHtml = (
        <>
            <div className="mt-5 text-center" id="step2-q1">
                <p className="mt-5 w-full font-bold">
                    Er det det originale tag eller er det blevet skiftet?
                </p>
                <div className="flex gap-4 place-content-center">
                    <button className="mt-6 border-2 border-orange-500 p-3 text-sm font-semibold text-orange-500 rounded-lg" onClick={async (e) => {changedRoof(e)}}>
                        Skiftet
                    </button>
                    <button className="mt-6 border-2 border-mygreen p-3 text-sm font-semibold text-mygreen rounded-lg" onClick={async (e) => {originalRoof(e)}}>
                        Original
                    </button>
                </div>
                <div className="opacity-0 h-0 transition-all" id="changed-roof">
                    <input type="number" placeholder="Hvilket år har i skiftet tag?"/>
                </div>
            </div>
            <div className="mt-5 text-center opacity-0 h-0 transition-all" id="step2-q2">
                <p className="mt-5 w-full font-bold">
                    Hvor mange tagflader har dit hus?
                </p>
                <div className="flex gap-4 place-content-center">
                    <button className="mt-6 border-2 border-mygreen p-3 text-sm font-semibold text-mygreen rounded-full">
                        1
                    </button>
                    <button className="mt-6 border-2 border-mygreen p-3 text-sm font-semibold text-mygreen rounded-full">
                        2
                    </button>
                    <button className="mt-6 border-2 border-mygreen p-3 text-sm font-semibold text-mygreen rounded-full">
                        3
                    </button>
                    <button className="mt-6 border-2 border-mygreen p-3 text-sm font-semibold text-mygreen rounded-full">
                        4
                    </button>
                    <button className="mt-6 border-2 border-mygreen p-3 text-sm font-semibold text-mygreen rounded-full">
                        5
                    </button>
                    <button className="mt-6 border-2 border-mygreen p-3 text-sm font-semibold text-mygreen rounded-full">
                        +5
                    </button>
                </div>
            </div>
            <div className="mt-5 text-center opacity-0 h-0 transition-all" id="step2-q3">
                <p className="mt-5 w-full font-bold">
                    Har dit hus skorsten, ovenlysvinduer eller tagkviste
                </p>
                <div className="flex gap-4 place-content-center">
                    <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-white rounded-lg">
                        Nej
                    </button>
                    <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-white rounded-lg">
                        Ja
                    </button>
                </div>
            </div>
            <div className="mt-5 text-center opacity-0 h-0 transition-all" id="step2-q4">
                <p className="mt-5 w-full font-bold">
                    Ønsker du at få installeret nye ovenlysvinduer eller tagkviste?
                </p>
                <div className="flex gap-4 place-content-center">
                    <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-white rounded-lg">
                        Nej
                    </button>
                    <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-white rounded-lg">
                        Ja
                    </button>
                </div>
            </div>
            <div className="mt-5 text-center opacity-0 h-0 transition-all" id="step2-q5">
                <p className="mt-5 w-full font-bold">
                    Vil du også have lavet nye tagrender?
                </p>
                <div className="flex gap-4 place-content-center">
                    <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-white rounded-lg">
                        Nej
                    </button>
                    <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-white rounded-lg">
                        Ja
                    </button>
                </div>
            </div>
            <div className="mt-5 text-center opacity-0 h-0 transition-all" id="step2-q6">
                <p className="mt-5 w-full font-bold">
                    Vil du også have lavet nyt udhæng?
                </p>
                <div className="flex gap-4 place-content-center">
                    <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-white rounded-lg">
                        Nej
                    </button>
                    <button className="mt-6 border border-mygreen p-3 text-sm font-semibold text-white rounded-lg">
                        Ja
                    </button>
                </div>
            </div>
        </>
    )


    return (
        <>
            <Seo title="Beregn pris på nyt tag eller tagmaling" description="Beregn pris på nyt tag eller tagmaling" />
            <section>
                <div className="container">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="md:sticky md:top-0 col-span-3 lg:col-span-1">
                            {step == 1 && (
                                <>
                                    <div className="flex justify-between">
                                        <div className="my-auto">
                                            <h3 className="font-bold text-lg lg:text-2xl">
                                                Trin 1 - Din boligdata
                                            </h3>
                                            <p className="font-light text-sm">                                            
                                            Vores algoritmer har lavet nogle beregninger ud fra data vi har hentet om din bolig. Bekræft oplysningerne for at fortsætte.</p>
                                        </div>
                                    </div>
                                    {boligDataHtml}
                                    <div className="mt-10 sticky bottom-0">
                                        <button
                                            onClick={() => {
                                                setStep(2);
                                            }}
                                            className="bg-mygreen p-5 font-semibold text-lg text-white rounded-lg w-full">
                                            Bekræft boligdata
                                        </button>
                                    </div>
                                </>
                            )}
                            {step == 2 && (
                                <div className="col-span-3 lg:col-span-2 gap-5">
                                    <h2 className="font-bold text-xl lg:text-2xl">
                                        Trin 2 - Spørgsmål
                                    </h2>
                                    {questionsHtml}
                                </div>
                            )}
                            {step == 4 && (
                                <div className="col-span-3 lg:col-span-2 gap-5">
                                    {formHtml}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}

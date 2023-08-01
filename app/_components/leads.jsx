"use client";

import { useEffect, useState } from "react";
import { getLeads, handleSuccess } from "../utils/Serveractions/serverActions";
import { useAuth } from "@clerk/nextjs";
import { checkout } from "../utils/Serveractions/Payment/checkout";
import { getUserData } from "../utils/Serveractions/getUserData";
import { buyLead } from "../utils/Serveractions/buyLead";

export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState("nyeste");
    const [searchQuery, setSearchQuery] = useState("");
    const { userId } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [buyQuantity, setBuyQuantity] = useState(1);

    useEffect(() => {
        getUserData().then((data) => {
            if (data) {
                setUserData(data);
            }
        });
        fetchLeads();
    }, []);

    useEffect(() => {
        if (!isLoading && leads.length > 0) {
            sortLeads();
        }
    }, [selectedSortOption, isLoading]);

    const fetchLeads = async () => {
        try {
            setIsLoading(true);
            const leadsData = await getLeads();
            const convertedLeadsData = leadsData.map((lead) => convertToPlainValue(lead));
            setLeads(convertedLeadsData);
            setIsLoading(false);
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

    const sortLeads = () => {
        let sortedArray = [...leads];

        switch (selectedSortOption) {
            case "ældste":
                sortedArray.sort((a, b) => {
                    const timeA = convertToDate(a.time);
                    const timeB = convertToDate(b.time);
                    return timeA - timeB;
                });
                break;
            case "højeste":
                sortedArray.sort((a, b) => b.højSamletPris - a.højSamletPris);
                break;
            case "laveste":
                sortedArray.sort((a, b) => a.lavSamletPris - b.lavSamletPris);
                break;
            default:
                sortedArray.sort((a, b) => {
                    const timeA = convertToDate(a.time);
                    const timeB = convertToDate(b.time);
                    return timeB - timeA;
                });
                break;
        }

        setLeads(sortedArray);
    };

    const convertToDate = (timeString) => {
        if (!timeString) {
            return null;
        }

        const [day, month, year, hour, minute, second] = timeString.split(/[ .:]+/);

        return new Date(year, month - 1, day, hour, minute, second);
    };

    const handleSortChange = (event) => {
        setSelectedSortOption(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filterLeads = (leads) => {
        if (searchQuery.trim() === "") {
            return leads;
        }

        const query = searchQuery.toLowerCase().trim();
        return leads.filter((lead) => lead.by.toLowerCase().includes(query));
    };

    const filteredLeads = filterLeads(leads);
    console.log('Filtered leads: ', filteredLeads);
// If some email has more than 1 lead, combine them into 1 lead with the same email
    const combineLeadsByEmail = (leads) => {
        const combinedLeads = [];
        const emails = [];

        leads.forEach((lead, index) => {
            if (!emails.includes(lead.email)) {
                emails.push(lead.email);
                lead.combinedTekstArray = [];
                lead.combinedTekstArray.push(lead.nyTagTypeTekst);
                combinedLeads.push(lead);
            } else {
                const item = combinedLeads.find((item) => item.email === lead.email);
                if (!item.combinedTekstArray.includes(lead.nyTagTypeTekst)) {
                    item.combinedTekstArray.push(lead.nyTagTypeTekst);
                }
                // If the high value is higher or the low value is lower, then replace the value
                if (lead.højSamletPris > item.højSamletPris) {
                    item.højSamletPris = lead.højSamletPris;
                }
                if (lead.lavSamletPris < item.lavSamletPris) {
                    item.lavSamletPris = lead.lavSamletPris;
                }

            }
        });

        return combinedLeads;
    };


// Function to filter leads so only 1 lead per unique email is shown
    const filterLeadsByEmail = (leads) => {
        const filteredLeads = [];
        const emails = [];

        leads.forEach((lead) => {
            if (!emails.includes(lead.email)) {
                emails.push(lead.email);
                filteredLeads.push(lead);
            }
        });

        return filteredLeads;
    };

    console.log('Filtered leads: ', combineLeadsByEmail(filteredLeads));

    const emailfilteredLeads = combineLeadsByEmail(filteredLeads);




    return (
        <div>
            <section>
                <div className="container text-center">
                    <h1 className="font-semibold text-5xl">Leads</h1>
                    <p className="mt-5">Her kan du se alle leads du kan købe</p>
                    <p>{emailfilteredLeads.length} leads tilgængelige</p>
                    <div className="mx-auto mt-5 w-fit h-full px-10 py-4 text-lg bg-gray-200 rounded-lg shadow-lg flex-none align-middle justify-center">
                        <p className="my-auto font-medium">
                            Din saldo: {userData && userData.points}
                        </p>
                        <p>Tank op</p>
                        <input
                            onChange={(e) => setBuyQuantity(e.target.value)}
                            value={buyQuantity}
                            type="number"
                            className="rounded-md py-1 px-2 w-full"
                            placeholder="Hvor mange point vil du købe?"
                        />
                        <p
                            className="my-auto font-semibold cursor-pointer"
                            onClick={() =>
                                checkout({
                                    lineItems: [
                                        {
                                            price: process.env.NEXT_PUBLIC_PRICE_ID,
                                            quantity: buyQuantity,
                                        },
                                    ],
                                    userId: userId,
                                })
                            }>
                            Køb point
                        </p>
                    </div>
                    <div className="mt-10 flex gap-5">
                                                <select
                            name="sorter"
                            placeholder="Sorter efter"
                            className="inputLeads bg-white rounded-lg px-3 py-3 shadow-md w-full lg:w-2/12 text-lg"
                            value={selectedSortOption}
                            onChange={handleSortChange}>
                            <option value="nyeste">Nyeste</option>
                            <option value="ældste">Ældste</option>
                            <option value="højeste">Højeste pris</option>
                            <option value="laveste">Laveste pris</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Søg efter bynavn"
                            className="inputLeads bg-white rounded-lg text-lg px-3 py-3 shadow-md w-full"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                            {emailfilteredLeads.map((lead) => (
                                <div
                                    key={lead._id}
                                    className="bg-white flex flex-col gap-2 text-start rounded-xl p-5 shadow-md">
                                    <p className="text-sm">By</p>
                                    <p className="text-start my-auto font-semibold">
                                        {lead.postnummer} {lead.by}
                                    </p>
                                    <p className="text-sm">Kundens fornavn</p>
                                    <p className="text-start my-auto font-semibold">
                                        {lead.fornavn}
                                    </p>
                                    <p className="text-sm">Ønsker tilbud på</p>
                                    <p className="text-start my-auto font-semibold">
                                        {lead.combinedTekstArray.map((item, index) => (
                                            // If more than one item in array, add a comma  after each item except the last one, and if item is not "Tagmaling" add "tag" after the item
                                            <span key={index}>
                                                {item}
                                                {item !== "Tagmaling" ? "tag" : ""}
                                                {index < lead.combinedTekstArray.length - 1
                                                    ? ", "
                                                    : ""}
                                            </span>
                                        ))}
                                    </p>
                                    <p className="text-sm">Mulig omsætnings værdi</p>
                                    <p className="text-start my-auto font-semibold">
                                            <span>
                                                {lead.lavSamletPris} - {lead.hojSamletPris} kr.
                                            </span>
                                    </p>
                                    <p className="text-sm">Dato</p>
                                    <p className="text-start my-auto font-semibold">
                                        {lead.dato}
                                    </p>
                                    <button
                                        className="beregnKnap"
                                        onClick={() => {
                                            buyLead(lead._id).then((res) => {
                                                if (res !== "User has no points") {
                                                    alert("Lead købt");
                                                } else {
                                                    alert(
                                                        "Din saldo er for lav til at købe dette lead"
                                                    );
                                                }
                                            });
                                            fetchLeads();
                                            getUserData().then((data) => {
                                                if (data) {
                                                    setUserData(data);
                                                }
                                            });
                                        }}>
                                        Køb lead
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

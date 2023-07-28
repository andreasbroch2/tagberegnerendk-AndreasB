"use client";

import { useEffect, useState } from "react";
import { getLeads, buyLead, handleSuccess } from "../utils/Serveractions/serverActions";
import { useAuth } from "@clerk/nextjs";
import { checkout } from "../utils/Serveractions/Payment/checkout";

export default function Leads() {
    const [leads, setLeads] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState("nyeste");
    const [searchQuery, setSearchQuery] = useState("");
    const { userId } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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

    return (
        <div>
            <section>
                <div className="container text-center">
                    <h1 className="font-semibold text-5xl">Leads</h1>
                    <p className="mt-5">Her kan du se alle leads du kan købe</p>
                    <p>{leads.length} leads tilgængelige</p>

                    <div className="mt-10 flex gap-5">
                        {/*                         <select
                            name="sorter"
                            placeholder="Sorter efter"
                            className="inputLeads bg-white rounded-lg px-3 py-3 shadow-md w-full lg:w-2/12 text-lg"
                            value={selectedSortOption}
                            onChange={handleSortChange}>
                            <option value="nyeste">Nyeste</option>
                            <option value="ældste">Ældste</option>
                            <option value="højeste">Højeste pris</option>
                            <option value="laveste">Laveste pris</option>
                        </select> */}
                        <input
                            type="text"
                            placeholder="Søg efter bynavn"
                            className="inputLeads bg-white rounded-lg text-lg px-3 py-3 shadow-md  w-full"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                            {filteredLeads.map((lead) => (
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
                                        {lead.nyTagTypeTekst === "Tagmaling" ? (
                                            <span>{lead.nyTagTypeTekst}</span>
                                        ) : (
                                            <span>{lead.nyTagTypeTekst}tag</span>
                                        )}
                                    </p>
                                    <p className="text-sm">Mulig omsætnings værdi</p>
                                    <p className="text-start my-auto font-semibold">
                                        {lead.nyTagTypeTekst === "Tagmaling" ? (
                                            <span>{lead.tagMalingPris} kr</span>
                                        ) : (
                                            <span>
                                                {lead.lavSamletPris} - {lead.hojSamletPris} kr.
                                            </span>
                                        )}
                                    </p>
                                    <button
                                        className="beregnKnap"
                                        onClick={() =>
                                            checkout({
                                                lineItems: [
                                                    {
                                                        price: process.env.NEXT_PUBLIC_PRICE_ID,
                                                        quantity: 1,
                                                    },
                                                ],
                                                userId: userId,
                                                leadId: lead._id,
                                                customer: lead.fornavn,
                                            })
                                        }>
                                        Køb lead - 100kr
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

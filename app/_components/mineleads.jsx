"use client";

import { useState, useEffect } from "react";
import { getBoughtLeads } from "../utils/Serveractions/serverActions";
import { useAuth } from "@clerk/nextjs";

export default function MineLeads({ getUserData }) {
    const [boughtLeads, setBoughtLeads] = useState([]);
    const { userId } = useAuth();
    const [selectedLead, setSelectedLead] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchBoughtLeads = async () => {
            try {
                const leadsData = await getBoughtLeads(userId);
                setBoughtLeads(leadsData);
            } catch (error) {
                console.error("Error fetching bought leads:", error);
            }
        };

        fetchBoughtLeads();
    }, [userId]);

    const handleOpenModal = (lead) => {
        setSelectedLead(lead);
        setIsModalOpen(true);
    };

    return (
        <div>
            <section>
                <div className="container text-center">
                    <h1 className="font-semibold text-5xl">Mine Leads</h1>
                    <p className="mt-5">Her kan du se alle leads, du har købt</p>
                </div>
            </section>
            <section>
                <div className="container text-center">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                        {boughtLeads.map((lead) => (
                            <div
                                key={lead._id}
                                className="bg-white flex flex-col gap-2 text-start rounded-xl p-5 shadow-md">
                                <p className="text-sm">By</p>
                                <p className="text-start my-auto font-semibold">
                                    {lead.postnummer} {lead.by}
                                </p>
                                <p className="text-sm">Adresse</p>
                                <p className="text-start my-auto font-semibold">{lead.adresse}</p>
                                <p className="text-sm">Kundens fulde navn</p>
                                <p className="text-start my-auto font-semibold">
                                    {lead.fornavn} {lead.efternavn}
                                </p>
                                <p className="text-sm">Kundens telefonnummer</p>
                                <p className="text-start my-auto font-semibold">{lead.telefon}</p>
                                <p className="text-sm">Ønsker tilbud på</p>
                                <p className="text-start my-auto font-semibold">
                                    {lead.nyTagTypeTekst === "Tagmaling" ? (
                                        <span>{lead.nyTagTypeTekst}</span>
                                    ) : (
                                        <span>{lead.nyTagTypeTekst} tag</span>
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
                                    className="beregnKnap mt-5"
                                    onClick={() => handleOpenModal(lead)}>
                                    Se boligdata
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {isModalOpen && (
                <SalesGuideModal lead={selectedLead} onCloseModal={() => setIsModalOpen(false)} />
            )}
        </div>
    );
}

function SalesGuideModal({ lead, onCloseModal }) {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* <!-- Background overlay, show/hide based on modal state. --> */}
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true">
                    &#8203;
                </span>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 gap-3">
                        <div className="sm:flex sm:items-start font-semibold text-xl mb-5">
                            <p>Boligdata</p>
                        </div>

                        <p className="text-sm">Tagflade m2</p>
                        <p className="text-start my-auto font-semibold">{lead.tagfladeareal} m2</p>
                        <p className="text-sm">Grundplansareal m2</p>
                        <p className="text-start my-auto font-semibold">{lead.boligGrundPlan} m2</p>
                        <p className="text-sm">Tagvinkel</p>
                        <p className="text-start my-auto font-semibold">{lead.tagVinkel} grader</p>
                        <p className="text-sm">Nuværende tagtype</p>
                        <p className="text-start my-auto font-semibold">
                            {lead.boligTagTypeTekst} tag
                        </p>
                        <p className="text-sm">Højde til tagrende i meter</p>
                        <p className="text-start my-auto font-semibold">
                            {lead.hojdeTilTagrende} meter
                        </p>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-mygreen text-base font-medium text-white hover:bg-mygreen focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onCloseModal}>
                            Luk boligdata
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

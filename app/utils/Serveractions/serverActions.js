"use server";

import Lead from "../../models/Lead";

const convertToPlainObject = (data) => {
    return JSON.parse(JSON.stringify(data));
};

export async function getPriceData(leadPriceId) {
    try {
        const lead = await Lead.findOne({ leadPriceId });
        const plainLead = convertToPlainObject(lead);
        return plainLead;
    } catch (error) {
        throw new Error("Failed to fetch lead: " + error.message);
    }
}

export const createLead = async (
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
    udhæng,
    tagrender,
    time
) => {
    //Convert adresse to string
    try {
        postnummer = parseInt(postnummer);
        //convert højSamletPris to number
        let værdi;
        if (nyTagTypeTekst == "Tagmaling") {
            værdi = tagMalingPris;
        } else if (nyTagTypeTekst !== "Tagmaling") {
            værdi = samletPris;
        }
        // Remove all . and , from the string
        værdi = værdi.replace(/\./g, "");
        værdi = parseInt(værdi);

        if (nyTagTypeTekst == "Tagmaling") {
            samletPris = værdi;
            lavSamletPris = værdi * 0.8;
            højSamletPris = værdi * 1.2;
        }

        //split date from time time is in format 19.7.2023 12:00:00
        let dato = time.split(" ")[0];

        let newLead; // Declare newLead outside the else block

        let beskrivelse;
        if (nyTagTypeTekst == "Tagmaling") {
            beskrivelse = `Skal have tilbud på ${tagfladeareal} m2 Tagmaling`;
        } else if (nyTagTypeTekst !== "Tagmaling") {
            beskrivelse = `Skal have tilbud på ${tagfladeareal} m2 nyt ${nyTagTypeTekst}tag`;
        }
        // Opret en ny lead
        newLead = new Lead({
            fornavn: fornavn,
            efternavn: efternavn,
            email: email,
            telefon: telefon,
            nyTagType: nyTagType,
            nyTagTypeTekst: nyTagTypeTekst,
            boligTagType: boligTagType,
            boligTagTypeTekst: boligTagTypeTekst,
            tagVinkel: tagVinkel,
            tagfladeareal: tagfladeareal,
            skorsten: skorsten,
            lavSamletPris: lavSamletPris,
            hojSamletPris: højSamletPris,
            samletPris: samletPris,
            tagMalingPris: tagMalingPris,
            hojdeTilTagrende: højdeTilTagrende,
            adresse: adresse,
            by: by,
            postnummer: postnummer,
            boligGrundPlan: boligGrundPlan,
            leadPriceId: leadPriceId,
            vaerdi: værdi,
            time: time,
            dato: dato,
            bought: false,
            origin: "Tagberegneren",
            beskrivelse: beskrivelse,
            opgave: nyTagTypeTekst,
            udhaeng: udhæng,
            tagrender: tagrender,
        });

        //Check if adresse already exists in database and if it does, then dont save the lead
        // Gem leaden i databasen
        await newLead.save();
    } catch (error) {
        console.error("Fejl ved oprettelse af lead:", error);
    }
};

export async function getPlaceIdFromAddress(address, apiKey) {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address
            )}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Failed to retrieve geocoding results.");
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
            return data.results[0].place_id;
        } else {
            throw new Error("No geocoding results found for the given address.");
        }
    } catch (error) {
        throw new Error("Failed to retrieve the Place ID from the address.");
    }
}

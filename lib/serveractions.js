export const createLead = async (
    nyTagType,
    nyTagTypeTekst,
    boligTagType,
    boligTagTypeTekst,
    tagVinkel,
    tagfladeareal,
    skorsten,
    samletPris,
    tagMalingPris,
    højdeTilTagrende,
    adresse,
    boligGrundPlan,
    leadPriceId,
    by,
    postnummer,
    udhaeng,
    tagrender,
    tagAargang,
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
        // Make post request to api/google
        const response = await fetch("/api/createLead", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nyTagType: nyTagType,
                nyTagTypeTekst: nyTagTypeTekst,
                boligTagType: boligTagType,
                boligTagTypeTekst: boligTagTypeTekst,
                tagVinkel: tagVinkel,
                tagfladeareal: tagfladeareal,
                skorsten: skorsten,
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
                bought: false,
                origin: "Tagberegneren",
                beskrivelse: beskrivelse,
                opgave: nyTagTypeTekst,
                udhaeng: udhaeng,
                tagrender: tagrender,
                tagAargang: tagAargang,
            }),
        });
        console.log("response", response);
        // redirect to /pris?id=leadPriceId
        window.location.href = `/pris?id=${leadPriceId}`;
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

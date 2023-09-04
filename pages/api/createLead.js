import Lead from "../../models/Lead";
import { PostHog } from 'posthog-node';

async function handler(req, res) {
    const client = new PostHog(
        'phc_AVtfq7Tpl76X5VWwBe9Ykj5aoRuYhUCWbymCOeA5VJz',
        {
          host: "https://eu.posthog.com",
        }
      );
    let { nyTagType, nyTagTypeTekst, boligTagType, boligTagTypeTekst, tagVinkel, tagfladeareal, skorsten, samletPris, tagMalingPris, hojdeTilTagrende, adresse, boligGrundPlan, leadPriceId, by, postnummer, udhaeng, tagrender, time, tagAargang } = req.body;
    client.capture({
        distinctId: leadPriceId,
        event: 'Lead created',
    });
    try {
        postnummer = parseInt(postnummer);
        //convert højSamletPris to number
        let værdi;
        if (nyTagTypeTekst == "Tagmaling") {
            værdi = tagMalingPris;
        } else if (nyTagTypeTekst !== "Tagmaling") {
            værdi = samletPris;
        }
        let newLead; // Declare newLead outside the else block
        let beskrivelse;
        if (nyTagTypeTekst == "Tagmaling") {
            beskrivelse = `Skal have tilbud på ${tagfladeareal} m2 Tagmaling`;
        } else if (nyTagTypeTekst !== "Tagmaling") {
            beskrivelse = `Skal have tilbud på ${tagfladeareal} m2 nyt ${nyTagTypeTekst}tag`;
        }
        // Opret en ny lead
        newLead = new Lead({
            nyTagType: nyTagType,
            nyTagTypeTekst: nyTagTypeTekst,
            boligTagType: boligTagType,
            boligTagTypeTekst: boligTagTypeTekst,
            tagVinkel: tagVinkel,
            tagfladeareal: tagfladeareal,
            skorsten: skorsten,
            samletPris: samletPris,
            tagMalingPris: tagMalingPris,
            hojdeTilTagrende: hojdeTilTagrende,
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
        });
        //Check if adresse already exists in database and if it does, then dont save the lead
        // Gem leaden i databasen
        console.log("before save:", newLead);
        try {
            newLead.markModified("vaerdi");
            newLead.markModified("udhaeng");
            newLead.markModified("tagrender");
            newLead.markModified("hojdeTilTagrende");
            console.log("after modified");
            console.log("save", await newLead.save())
        } catch (error) {
            console.log("error saving", error);
        }
        console.log("after save");
        res.json("Lead oprettet:");
    } catch (error) {
        res.json("Fejl ved oprettelse af lead:", error);
    }
}

export default handler;
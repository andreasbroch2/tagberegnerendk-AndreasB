import Lead from "../../models/Lead";

async function handler(req, res) {
    let { nyTagType, nyTagTypeTekst, boligTagType, boligTagTypeTekst, tagVinkel, tagfladeareal, skorsten, samletPris, tagMalingPris, hojdeTilTagrende, adresse, boligGrundPlan, leadPriceId, by, postnummer, udhaeng, tagrender, time } = req.body;
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
        });
        //Check if adresse already exists in database and if it does, then dont save the lead
        // Gem leaden i databasen
        const save = await newLead.save(function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
        console.log("Lead oprettet:", save);
        res.json(save);
    } catch (error) {
        res.json("Fejl ved oprettelse af lead:", error);
    }
}

export default handler;
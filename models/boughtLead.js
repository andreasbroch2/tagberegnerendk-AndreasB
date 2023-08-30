const mongoose = require("../lib/db");

let BoughtLead;

try {
    // Hvis Lead-modellen allerede er blevet kompileret, genbruges den
    BoughtLead = mongoose.model("BoughtLead");
} catch (error) {
    // Hvis Lead-modellen ikke er blevet kompileret, oprettes den
    const boughtLeadSchema = new mongoose.Schema({
        userId: String,
        leadId: String,
        fornavn: String,
        efternavn: String,
        email: String,
        telefon: String,
        nyTagType: String,
        nyTagTypeTekst: String,
        boligTagType: String,
        boligTagTypeTekst: String,
        tagVinkel: String,
        tagfladeareal: String,
        skorsten: String,
        lavSamletPris: String,
        højSamletPris: String,
        samletPris: String,
        tagMalingPris: String,
        højdeTilTagrende: String,
        adresse: String,
        by: String,
        postnummer: String,
        boligGrundPlan: String,
        leadPriceId: String,
        time: String,
    });

    BoughtLead = mongoose.model("BoughtLead", boughtLeadSchema);
}

module.exports = BoughtLead;

const mongoose = require("../lib/db");

let Lead;

try {
    // Hvis Lead-modellen allerede er blevet kompileret, genbruges den
    Lead = mongoose.model("Lead");
} catch (error) {
    // Hvis Lead-modellen ikke er blevet kompileret, oprettes den
    const leadSchema = new mongoose.Schema({
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
        hojSamletPris: String,
        samletPris: String,
        tagMalingPris: String,
        hojdeTilTagrende: Number,
        adresse: String,
        by: String,
        postnummer: Number,
        boligGrundPlan: String,
        leadPriceId: String,
        vaerdi: Number,
        time: String,
        dato: String,
        bought: Boolean,
        origin: String,
        beskrivelse: String,
        opgave: String,
        udhaeng: Boolean,
        tagrender: Boolean,
        gratisTagTjek: Boolean,
        tagAargang: Number,
    });

    Lead = mongoose.model("Lead", leadSchema);
}

module.exports = Lead;

const mongoose = require("../utils/db");

let User;

try {
    // Hvis Lead-modellen allerede er blevet kompileret, genbruges den
    User = mongoose.model("User");
} catch (error) {
    // Hvis Lead-modellen ikke er blevet kompileret, oprettes den
    const userSchema = new mongoose.Schema({
        userId: String,
        email: String,
        navn: String,
        tlf: String,
        by: String,
        postnummer: String,
        address: String,
        role: String,
        firma: String,
        cvr: String,
        boughtLeads: Array,
        points: Number,
        intro: Boolean,
        intro2: Boolean,
        intro3: Boolean,
        activeMembership: Boolean,
        membershipType: String,
        membershipPrice: Number,
        daysUntilRenewal: Number,
    });

    User = mongoose.model("User", userSchema);
}

module.exports = User;

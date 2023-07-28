import { NextResponse } from "next/server";

const mongoose = require("mongoose");

import Lead from "@/app/models/Lead";
import BoughtLead from "@/app/models/boughtLead";

const connectToDatabase = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
        throw new Error("Failed to connect to the database");
    }
};

const buyLead = async (leadId, userId) => {
    try {
        const foundLead = await Lead.findById(leadId);
        if (!foundLead) {
            console.log("Lead not found:", leadId);
        } else {
            const boughtLead = new BoughtLead({
                userId: userId,
                leadId: leadId.toString(),
                fornavn: foundLead.fornavn,
                efternavn: foundLead.efternavn,
                email: foundLead.email,
                telefon: foundLead.telefon,
                nyTagType: foundLead.nyTagType,
                nyTagTypeTekst: foundLead.nyTagTypeTekst,
                boligTagType: foundLead.boligTagType,
                boligTagTypeTekst: foundLead.boligTagTypeTekst,
                tagVinkel: foundLead.tagVinkel,
                tagfladeareal: foundLead.tagfladeareal,
                skorsten: foundLead.skorsten,
                lavSamletPris: foundLead.lavSamletPris,
                højSamletPris: foundLead.højSamletPris,
                samletPris: foundLead.samletPris,
                tagMalingPris: foundLead.tagMalingPris,
                højdeTilTagrende: foundLead.højdeTilTagrende,
                adresse: foundLead.adresse,
                by: foundLead.by,
                postnummer: foundLead.postnummer,
                boligGrundPlan: foundLead.boligGrundPlan,
                leadPriceId: foundLead.leadPriceId,
                time: foundLead.time,
                buyTime: new Date().toISOString(),
                // Copy more fields from the foundLead to the boughtLead as needed
            });

            await boughtLead.save();
            console.log("Purchase successful:", boughtLead);

            await Lead.deleteOne({ _id: leadId });
            console.log("Lead deleted:", leadId);
        }
    } catch (error) {
        console.error("Error during purchase:", error);
    }
};

export async function POST(request) {
    const body = await request.json();
    const { leadId, userId, passId } = body;

    // Check if the provided leadId is valid before proceeding
    if (passId !== process.env.PASS_ID) {
        return NextResponse.json({ error: "Invalid Identifaction" }, { status: 400 });
    }

    await connectToDatabase();
    await buyLead(leadId, userId);

    return NextResponse.json({ message: "Success!" });
}

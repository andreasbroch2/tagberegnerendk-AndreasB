"use server";

import Lead from "@/app/models/Lead";
import User from "@/app/models/user";
import { getUserData } from "./getUserData";
import { addLeadToSheet, findOrCreateUserGoogleSheet, sendLeadEmail } from "./serverActions";

const convertToPlainObject = (data) => {
    return JSON.parse(JSON.stringify(data));
};

export async function buyLead(leadId) {
    //Get user data
    const user = await getUserData();
    //Check if user has enough points
    if (user.points > 0) {
        //Find lead by id and set bought to true
        const lead = await Lead.findOneAndUpdate({ _id: leadId }, { bought: true });
        //Add lead to user boughtLeads array
        const userWithBoughtLead = await User.findOneAndUpdate(
            { userId: user.userId },
            { $push: { boughtLeads: lead } }
        );
        //Update user points
        const userWithUpdatedPoints = await User.findOneAndUpdate(
            { userId: user.userId },
            { points: user.points - 1 }
        );
        //convert to plain object
        const plainUserWithUpdatedPoints = convertToPlainObject(userWithUpdatedPoints);
        return plainUserWithUpdatedPoints;
    } else {
        console.log("User has no points");
        //Return status code 400
        return "User has no points";
    }
}
// Function to transfer lead to user manually
export async function transferLead(leadId, userEmail) {
    let currentUserData;
    let user;
    // Find user by email
    const userInDb = await User.findOne({ email: userEmail });
    if (!userInDb) {
        const newUser = new User({
            email: userEmail,
            tlf: "",
            by: "",
            postnummer: "",
            address: "",
            role: "partner",
            firma: "",
            cvr: "",
            boughtLeads: [],
            points: 0,
            intro: false,
            intro2: false,
            intro3: false,
            activeMembership: false,
            membershipType: "",
            membershipPrice: 0,
            daysUntilRenewal: 0,
        });
        await newUser.save();
        currentUserData = newUser;
        //convert to plain object
        user = convertToPlainObject(newUser);
    } else {
        currentUserData = userInDb;
        //convert to plain object
        user = convertToPlainObject(userInDb);
    }
    //Find lead by id and set bought to true
    const lead = await Lead.findOneAndUpdate({ _id: leadId }, { bought: true });
    //Add lead to user boughtLeads array
    const userWithBoughtLead = await User.findOneAndUpdate(
        { userId: user.userId },
        { $push: { boughtLeads: lead } }
    );
    const plainUserWithUpdatedPoints = convertToPlainObject(userWithBoughtLead);
    sendLeadEmail(lead, user.email);
    const sheetId = await findOrCreateUserGoogleSheet(user);
    addLeadToSheet(user.email, lead);
    return "Lead transferred";
}

export async function gratisTagTjek(leadId, accept){
    // Update lead in database with true value in gratisTagTjek
    const lead = await Lead.findOneAndUpdate({ _id: leadId }, { gratisTagTjek: accept });
    const gratisTagTjek = lead.gratisTagTjek;
    return gratisTagTjek;
}
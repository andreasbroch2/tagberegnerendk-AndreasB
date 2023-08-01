"use server";

import Lead from "@/app/models/Lead";
import User from "@/app/models/user";
import { getUserData } from "./getUserData";

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

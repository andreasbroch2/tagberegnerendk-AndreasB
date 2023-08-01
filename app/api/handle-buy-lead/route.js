import { NextResponse } from "next/server";

const mongoose = require("mongoose");

import Lead from "@/app/models/Lead";
import BoughtLead from "@/app/models/boughtLead";
import User from "@/app/models/user";

const convertToPlainObject = (data) => {
    return JSON.parse(JSON.stringify(data));
};

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

const buyCredits = async (userId, credits) => {
    //Find user by id
    let user = await User.findOne({ userId: userId });

    credits = parseInt(credits);
    try {
        //Update user points
        const userWithUpdatedPoints = await User.findOneAndUpdate(
            { userId: userId },
            { points: user.points + credits }
        );
        //convert to plain object
        const plainUserWithUpdatedPoints = convertToPlainObject(userWithUpdatedPoints);
        return plainUserWithUpdatedPoints;
    } catch (error) {
        throw new Error("Failed to buy credits: " + error.message);
    }
};

export async function POST(request) {
    const body = await request.json();
    const { userId, credits } = body;

    // Check if the provided leadId is valid before proceeding

    await connectToDatabase();
    await buyCredits(userId, credits);

    return NextResponse.json({ message: "Success!" });
}

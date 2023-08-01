"use server";
import { currentUser } from "@clerk/nextjs";
import User from "../../models/user";

let currentUserData;

const convertToPlainObject = (data) => {
    return JSON.parse(JSON.stringify(data));
};

export async function getUserData() {
    const user = await currentUser();
    // Check if the user exist in mongodb user model and if not, create it
    if (user) {
        const userInDb = await User.findOne({ userId: user.id });
        if (!userInDb) {
            const newUser = new User({
                userId: user.id,
                email: user.emailAddresses[0].emailAddress,
                navn: user.fullName,
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
            const plainNewUser = convertToPlainObject(newUser);
            return plainNewUser;
        } else {
            currentUserData = userInDb;
            //convert to plain object
            const plainUserInDb = convertToPlainObject(userInDb);
            return plainUserInDb;
        }
    }
    if (!user) {
        throw new Error("You must be signed in to use this feature");
    }
    const serverData = {
        user: user,
    };
    return "serverData";
}

"use server";
import { currentUser } from "@clerk/nextjs";

export async function getUserData() {
    const user = await currentUser();
    if (!user) {
        throw new Error("You must be signed in to use this feature");
    }
    const serverData = {
        userId: user.id,
        userName: user.username,
        profileImage: user.profileImageUrl,
    };
    return serverData;
}

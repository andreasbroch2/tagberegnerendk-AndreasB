"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(lineItems, userId) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://tagberegneren.dk/partner/leads",
        cancel_url: "https://tagberegneren.dk/partner/leads",
        metadata: {
            userId: userId,
            credits: lineItems[0].quantity,
        },
    });

    return session;
}

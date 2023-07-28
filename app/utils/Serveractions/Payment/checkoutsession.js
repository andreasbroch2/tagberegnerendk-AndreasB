"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession(lineItems, userId, leadId, customer) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://tagberegneren.dk/partner/mineleads",
        cancel_url: "https://tagberegneren.dk/partner/mineleads",
        metadata: {
            userId: userId,
            leadId: leadId,
            customer: customer,
        },
    });

    return session;
}

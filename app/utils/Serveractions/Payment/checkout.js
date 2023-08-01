import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "./checkoutsession";

export async function checkout({ lineItems, userId, credits }) {
    let stripePromise = null;

    const getStripe = () => {
        if (!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        }
        return stripePromise;
    };

    const stripe = await getStripe();

    const session = await createCheckoutSession(lineItems, userId, credits);

    await stripe.redirectToCheckout({
        sessionId: session.id,
    });
}

"use client";

import { ClerkProvider, SignUp } from "@clerk/clerk-react";

function MySignUpPage() {
    // Render the SignUp component
    // somewhere in your app
    return (
        <>
            <section>
                <div className="container flex justify-center p-20">
                    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
                </div>
            </section>
        </>
    );
}

export default MySignUpPage;

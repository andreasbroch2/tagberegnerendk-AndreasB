import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <>
            <section>
                <div className="container flex justify-center p-20">
                    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
                </div>
            </section>
        </>
    );
}

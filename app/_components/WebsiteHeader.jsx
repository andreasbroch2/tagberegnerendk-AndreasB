"use client";
import Link from "next/link";
import { useState } from "react";
import { UserButton, SignedOut, SignedIn } from "@clerk/clerk-react";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function WebsiteHeader() {
    const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

    function handleNavToggle() {
        setIsNavOpen(!isNavOpen); // toggle the state of isNavOpen
        console.log(isNavOpen);
    }

    return (
        <header>
            <GoogleAnalytics />
            <div className="bg-mygreen text-white text-center w-full  text-sm lg:text-lg font-medium py-2 px-2">
                <p>Gratis prisberegning på nyt tag og tagmaling</p>
            </div>
            <div className="container px-3 lg:px-0">
                <div className="mt-5 flex flex-wrap justify-between">
                    <Link href="/" className="flex my-auto">
                        <h4 className="text-3xl font-semibold flex gap-2">TagBeregneren.dk</h4>
                    </Link>

                    <ul className="ml-10 hidden flex-wrap gap-5 items-center justify-center lg:flex font-light">
                        <li className="mr-4 hover:underline md:mr-6">
                            <Link href="/goderaad">Gode råd</Link>
                        </li>
                        <li className="mr-4 hover:underline md:mr-6">
                            <Link href="/artikler">Artikler</Link>
                        </li>
                        <li className="mr-4 hover:underline md:mr-6">
                            <Link href="/hurtigesvar">Hurtige svar</Link>
                        </li>
                        <li className="mr-4 hover:underline md:mr-6">
                            <Link href="/omos">Om os</Link>
                        </li>
                        <SignedIn>
                            <div className="flex font-medium">
                                <li className="mr-4 hover:underline md:mr-6">|</li>
                                <li className="mr-4 hover:underline md:mr-6">
                                    <Link href="/partner/leads">Leads</Link>
                                </li>
                                <li className="mr-4 hover:underline md:mr-6">
                                    <Link href="/partner/mineleads">Mine Leads</Link>
                                </li>
                            </div>
                        </SignedIn>
                    </ul>
                    <div className="hidden lg:block">
                        <UserButton afterSignOutUrl="/" />
                    </div>

                    <SignedOut>
                        <Link href="/">
                            <button className="beregnKnap hidden lg:block font-medium">
                                Beregn pris
                            </button>
                        </Link>
                    </SignedOut>

                    <button onClick={handleNavToggle} className="lg:hidden mobileMenu">
                        <div className="space-y-2">
                            <div className="w-8 h-0.5 bg-gray-500"></div>
                            <div className="w-8 h-0.5 bg-gray-600"></div>
                            <div className="w-8 h-0.5 bg-gray-600"></div>
                        </div>
                        <div
                            className={`lg:hidden ${
                                isNavOpen ? "block" : "hidden"
                            } menuDropdown mt-5`}>
                            <div className="flex flex-col items-start justify-start">
                                <Link href="/goderaad" className="w-full">
                                    <p className="px-5 py-4 w-full text-start">Gode råd</p>
                                </Link>
                                <Link href="/artikler" className="w-full">
                                    <p className="px-5 py-4 w-full text-start">Artikler</p>
                                </Link>
                                <Link href="/hurtigesvar" className="w-full">
                                    <p className="px-5 py-4 w-full text-start">Hurtige svar</p>
                                </Link>
                                <Link href="/omos" className="w-full">
                                    <p className="px-5 py-4 w-full text-start">Om os</p>
                                </Link>
                                <SignedIn>
                                    <hr className="w-full" />
                                    <Link href="/partner/leads" className="w-full">
                                        <p className="px-5 py-4 w-full text-start">Leads</p>
                                    </Link>
                                    <Link href="/partner/mineleads" className="w-full">
                                        <p className="px-5 py-4 w-full text-start">Mine Leads </p>
                                    </Link>
                                    <div className="px-5 py-4 w-full text-start">
                                        <UserButton afterSignOutUrl="/" />
                                    </div>
                                </SignedIn>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
}

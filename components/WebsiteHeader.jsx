import Link from "next/link";
import { useState } from "react";
import Search from "./Search";

export default function WebsiteHeader() {
    const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

    function handleNavToggle() {
        setIsNavOpen(!isNavOpen); // toggle the state of isNavOpen
    }

    return (
        <header>
            <div className="bg-mygreen text-white text-center w-full  text-sm lg:text-lg font-medium py-2 px-2">
                <p>Præcis prisberegning på nyt tag og tagmaling</p>
            </div>
            <div className="container px-3 lg:px-0">
                <div className="mt-5 flex flex-wrap justify-between">
                    <Link href="/" className="flex my-auto">
                        <h4 className="text-xl md:text-3xl font-semibold flex gap-2">TagBeregneren.dk</h4>
                    </Link>
                    <ul className="ml-10 hidden flex-wrap gap-5 items-center justify-center lg:flex font-light">
                        <li className="mr-4 text-xl font-semibold hover:underline md:mr-6">
                            <Link href="/hvad-koster-det-at-skifte-tag">Nyt Tag</Link>
                        </li>
                    </ul>
                    <button onClick={handleNavToggle} className="lg:hidden mobileMenu">
                        <div className="space-y-2">
                            <div className="w-8 h-0.5 bg-gray-500"></div>
                            <div className="w-8 h-0.5 bg-gray-600"></div>
                            <div className="w-8 h-0.5 bg-gray-600"></div>
                        </div>
                        <div
                            className={`lg:hidden ${isNavOpen ? "block" : "hidden"
                                } menuDropdown mt-5`}>
                            <div className="flex flex-col items-start justify-start">
                                <Link href="/goderaad" className="w-full">
                                    <p className="px-5 py-4 w-full text-start">Gode råd</p>
                                </Link>
                                <Link href="/hurtigesvar" className="w-full">
                                    <p className="px-5 py-4 w-full text-start">Hurtige svar</p>
                                </Link>
                                <Link href="/omos" className="w-full">
                                    <p className="px-5 py-4 w-full text-start">Om os</p>
                                </Link>
                            </div>
                        </div>
                    </button>
                    <Search classes={'mobile'} />
                </div>
            </div>
        </header>
    );
}

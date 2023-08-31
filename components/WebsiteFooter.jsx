import Link from "next/link";

export default function WebsiteFooter() {
    return (
        <footer className="py-5 m-0">
            <div className="container p-3 lg:p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20 py-16">
                    <div className="text-white">
                        <h4 className="font-semibold text-2xl">Tagberegneren.dk</h4>
                        <p className="font-light mt-4">
                            Tagberegneren.dk er en gratis beregner, der hjælper dig med at beregne
                            prisen på dit nye tag. Vi har samlet priser fra håndværkere i hele
                            Danmark, så du kan få et overblik over, hvad det cirka vil koste at få
                            et nyt tag.
                        </p>
                    </div>
                    <div className="text-white">
                        <p className="font-semibold text-xl">Links</p>
                        <ul>
                            <li className="mt-4">
                                <Link href="/">Forside</Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/hvad-koster-det-at-skifte-tag">Hvad koster det at skifte tag?</Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/pris-paa-tagmaling">Hvad koster tagmaling?</Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/goderaad">Gode råd</Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/omos">Om os</Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/hurtigesvar">Hurtige svar</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-white">
                        <Link href="/tagtyper" className="font-semibold text-xl">Tagtyper</Link>
                        <ul>
                            <li className="mt-4">
                                <Link href="/tagtyper/hvad-koster-tegltag-guide">Tegltag</Link>
                            </li>
                            <li className="mt-4">
                                <Link href="/tagtyper/hvad-koster-tagpap-tag-guide">Tagpap</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

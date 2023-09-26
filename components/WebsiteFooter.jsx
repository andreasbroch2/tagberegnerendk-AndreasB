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
                        <ul className="mt-4">
                            <li className="footer-link">
                                <Link href="/">Forside</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/hvad-koster-det-at-skifte-tag">Hvad koster det at skifte tag?</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/pris-paa-tagmaling">Hvad koster tagmaling?</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/hvad-koster-loftisolering-guide">Hvad koster loftisolering?</Link>
                            </li>                            
                            <li className="footer-link">
                                <Link href="/hvad-koster-tagisolering-guide">Hvad koster tagisolering?</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/hvad-koster-tagrensning-guide">Hvad koster tagrensning?</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/hvad-koster-solceller-guide">Hvad koster solceller?</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/hvad-koster-algerens-guide">Hvad koster algerens?</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/goderaad">Gode råd</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/omos">Om os</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/hurtigesvar">Hurtige svar</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="text-white">
                        <Link href="/tagtyper" className="font-semibold text-xl">Tagtyper</Link>
                        <ul className="mt-4">
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-tegltag-guide">Tegltag</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-tagpap-tag-guide">Tagpap</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-eternit-tag-guide">Eternit</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-solcelletag-guide">Solcelletag</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-skifer-tag-guide">Skifertag</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-staaltag-guide">Ståltag</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-straatag-guide">Stråtag</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-zinktag-guide">Zinktag</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-betontegl-tag-guide">Betontegl</Link>
                            </li>
                            <li className="footer-link">
                                <Link href="/tagtyper/hvad-koster-decratag-guide">Decratag</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

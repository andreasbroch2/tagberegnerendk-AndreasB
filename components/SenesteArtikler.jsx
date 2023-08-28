import { artikler } from "../utils/artikler";
import Artikel from "./Artikel";
import Link from "next/link";

export default function SenesteArtikler(props) {
    return (
        <section className="artikler">
            <div className="container">
                <div className="mb-10">
                    <h3 className="font-semibold leading-tight text-5xl lg:text-6xl">
                        Seneste artikler
                    </h3>
                    <p className="mt-5 w-full lg:w-7/12">
                        Se de seneste artikler om tag og tagrenovering her. Vi skriver løbende
                        artikler om tag og tagrenovering, så du kan blive klogere på tag og
                        tagrenovering.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {artikler.map(
                        (artikel, index) =>
                            index < 4 && (
                                <Artikel
                                    home={props.home}
                                    key={index}
                                    title={artikel.title}
                                    article={artikel.article}
                                />
                            )
                    )}
                </div>

                <div className="mt-10 text-center">
                    <Link href="/artikler">
                        <button className="linkKnap p-10">
                            Se alle vores {artikler.length} artikler
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

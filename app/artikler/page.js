import dynamic from "next/dynamic";
import { artikler } from "../utils/artikler";

const Artikel = dynamic(() => import("../_components/Artikel"));

export const metadata = {
    title: "Artikler om tagrenovering, nyt tag og tagmaling - Læs ekspertråd og tips",
    description:
        "Få eksperttips og vejledning i vores artikler om tagrenovering, nyt tag og tagmaling. Bliv informeret og klar til at tage de rigtige beslutninger for dit tagprojekt",
};

export default function Page(props) {
    return (
        <section>
            <div className="container">
                <div className="text-center">
                    <h1 className="font-semibold leading-tight text-4xl">Artikler</h1>
                    <p className="text-center mt-5 p-4">
                        Her finder du alle vores {artikler.length} artikler
                    </p>
                </div>

                <div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {artikler.map((artikel, index) => (
                            <Artikel
                                id={index}
                                home={props.home}
                                key={index}
                                title={artikel.title}
                                article={artikel.article}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

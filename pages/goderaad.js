import Råd from "../components/Råd";
import { goderåd } from "../app/utils/goderåd";
import { navne } from "../app/utils/navne";

export default function Page() {
    return (
        <div className="mb-20">
            <section>
                <div className="container">
                    <div className="text-center w-full lg:w-7/12 mx-auto">
                        <h1 className="font-semibold leading-tight text-4xl">
                            {goderåd.length} Gode råd
                        </h1>
                        <p className="text-center mt-5 p-4">
                            Gode råd til dig der skal have lavet en tagrenovering i form af nyt tag
                            eller tagmaling.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                            {/* Import råd from goderåd.js and map them as <Råd /> */}
                            {goderåd.map((råd, index) => (
                                <Råd
                                    key={index}
                                    titel={råd.titel}
                                    beskrivelse={råd.beskrivelse}
                                    nummer={index + 1}
                                    forfatter={navne.map((navn) => navn)[index]}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

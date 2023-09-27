import Image from "next/image";
import calculator from "../assets/calculator.svg";
import free from "../assets/free.svg";

export default function DerforSection() {
    return (
        <section className="derfor">
            <div className="container">
                <div>
                    <h2>
                        Hvorfor bruge tagberegneren?
                    </h2>
                </div>
                <div className="p-6 text-center md:p-10 rounded-3xl bg-white shadow-xl mt-10">
                    <div className="grid grid-cols 1 lg:grid-cols-2 gap-10 lg:gap-20">
                        <div className="text-darkblue flex flex-col items-center">
                            <div className="iconBoxLight shadow-xl">
                                <Image src={calculator} alt="Lommeregner" />
                            </div>
                            <h3 className="mt-4">
                                Automatisk beregning
                            </h3>
                            <p className="font-light text-darkblue mt-4">
                                Tagberegneren.dk giver dig en nøjagtig pris på dit nye tag eller din
                                nye tagmaling. Det tager kun 30 sekunder at få en pris. Det hele
                                regnes ud automatisk, så snart du har indtastet din adresse.
                            </p>
                        </div>
                        <div className="text-darkblue flex flex-col items-center">
                            <div className="iconBoxLight shadow-xl">
                                <Image src={free} alt="Gratis" />
                            </div>
                            <h3 className="mt-4">
                                100% Gratis tag beregner
                            </h3>
                            <p className="font-light text-darkblue mt-4">
                                Mange prisberegnere på nettet er ikke gratis. Det er
                                tagberegneren.dk. Vi har ingen skjulte gebyrer eller lignende. Det
                                er 100% gratis at bruge tagberegneren.dk.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

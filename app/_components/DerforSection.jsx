import { Icon } from "@iconify/react";

export default function DerforSection() {
    return (
        <section className="derfor">
            <div className="container">
                <div>
                    <h4 className="font-semibold leading-tight text-3xl text-darkblue">
                        Hvorfor bruge tagberegneren?
                    </h4>
                </div>
                <div className="p-10 rounded-3xl bg-white shadow-xl mt-10">
                    <div className="grid grid-cols 1 lg:grid-cols-2 gap-10 lg:gap-20">
                        <div className="text-darkblue">
                            <div className="iconBoxLight shadow-xl">
                                <Icon
                                    icon="mdi:calculator"
                                    width={30}
                                    height={50}
                                    color="#13BA00"
                                />
                            </div>
                            <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                Automitisk beregning
                            </h4>
                            <p className="font-light text-darkblue mt-4">
                                Tagberegneren.dk giver dig en nøjagtig pris på dit nye tag eller din
                                nye tagmaling. Det tager kun 30 sekunder at få en pris. Det hele
                                regnes ud automatisk, så snart du har indtastet din adresse.
                            </p>
                        </div>
                        <div className="text-darkblue">
                            <div className="iconBoxLight shadow-xl">
                                <Icon
                                    icon="material-symbols:money-off"
                                    height={30}
                                    width={30}
                                    color="#13ba00"
                                />
                            </div>
                            <h4 className="font-semibold text-2xl text-darkblue mt-5">
                                100% Gratis beregner
                            </h4>
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

import { Icon } from "@iconify/react";

export default function GodeRåd() {
    return (
        <section>
            <div className="container">
                <h4 className="font-semibold leading-tight text-3xl text-darkblue">
                    3 gode råd til dig som skal renovere tag
                </h4>
                <div className="p-10 rounded-3xl bg-darkblue shadow-xl mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
                        <div className="text-white">
                            <div className="iconBox">
                                <Icon
                                    icon="ic:outline-local-offer"
                                    color="#13ba00"
                                    width="30"
                                    height="30"
                                />
                            </div>
                            <h4 className="font-semibold text-2xl mt-3">Indhent flere tilbud</h4>
                            <p className="font-light text-zinc-300 mt-3">
                                Indhent tilbud fra flere tagrenoveringsentreprenører. Sammenlign
                                priser og tjenester for at vælge den bedste entreprenør til dit
                                projekt.
                            </p>
                        </div>
                        <div className="text-white">
                            <div className="iconBox">
                                <Icon
                                    icon="mingcute:paper-line"
                                    color="#13ba00"
                                    width="30"
                                    height="30"
                                />
                            </div>
                            <h4 className="font-semibold text-2xl mt-3">Verificer forsikring</h4>
                            <p className="font-light text-zinc-300 mt-3">
                                Sørg for, at entreprenøren har gyldige beviser og de nødvendige
                                forsikringer for at beskytte dig og dem selv under arbejdet.
                            </p>
                        </div>
                        <div className="text-white">
                            <div className="iconBox">
                                <Icon
                                    icon="solar:user-speak-broken"
                                    color="#13ba00"
                                    width="30"
                                    height="30"
                                />
                            </div>
                            <h4 className="font-semibold text-2xl mt-3">Bed om referencer</h4>
                            <p className="font-light text-zinc-300 mt-3">
                                Få referencer fra tidligere kunder og se eksempler på entreprenørens
                                tidligere tagrenoveringsprojekter for at vurdere deres kvalitet og
                                ekspertise.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

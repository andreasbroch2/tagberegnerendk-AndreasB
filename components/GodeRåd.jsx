import Image from "next/image";
import pricetag from "../assets/pricetag.svg";
import document from "../assets/document.svg";
import userSpeak from "../assets/user-speak.svg";

export default function GodeRåd() {
    return (
        <section>
            <div className="container">
                <h2>
                    3 gode råd til dig som skal renovere tag
                </h2>
                <div className="p-10 rounded-3xl bg-darkblue shadow-xl mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
                        <div className="text-white flex flex-col items-center text-center">
                            <div className="iconBox">
                                <Image src={pricetag} alt="Tilbud" />
                            </div>
                            <h3 className="font-semibold text-2xl mt-3">Indhent flere tilbud</h3>
                            <p className="font-light text-zinc-300 mt-3">
                                Indhent tilbud fra flere tagrenoveringsentreprenører. Sammenlign
                                priser og tjenester for at vælge den bedste entreprenør til dit
                                projekt.
                            </p>
                        </div>
                        <div className="text-white flex flex-col items-center text-center">
                            <div className="iconBox">
                                <Image src={document} alt="Dokument" />
                            </div>
                            <h3 className="font-semibold text-2xl mt-3">Verificer forsikring</h3>
                            <p className="font-light text-zinc-300 mt-3">
                                Sørg for, at entreprenøren har gyldige beviser og de nødvendige
                                forsikringer for at beskytte dig og dem selv under arbejdet.
                            </p>
                        </div>
                        <div className="text-white flex flex-col items-center text-center">
                            <div className="iconBox">
                                <Image src={userSpeak} alt="User Speak" />
                            </div>
                            <h3 className="font-semibold text-2xl mt-3">Bed om referencer</h3>
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

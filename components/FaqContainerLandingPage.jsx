import { useState } from "react";
import { faqData } from "../utils/faqData";
import Link from "next/link";

export default function FaqContainer() {
    const [expandedId, setExpandedId] = useState(null);

    const toggleAnswer = (index) => {
        setExpandedId((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div id="faq-container" className="bg-light px-8 py-16 lg:p-20 shadow-2xl rounded-xl mt-10">
            <div className="text-white mb-10">
                <h2 className="font-semibold leading-tight text-5xl text-white">
                    Ofte stilte spørgsmål
                </h2>
                <p className="mt-16 w-full lg:w-8/12">
                    Vi har samlet rigtig mange spørgsmål sammen fra jer og svaret på så mange som
                    muligt, så alle kan lære lidt om tag. Se alle spørgsmål og svar på siden FaQ her
                    har vi besvaret {faqData.length} spørgsmål.
                </p>
            </div>
            {faqData.map(
                (faq, index) =>
                    index < 10 && (
                        <div className="faq-item" key={index} onClick={() => toggleAnswer(index)}>
                            <div className="question font-normal">{faq.spørgsmål}</div>
                            {expandedId === index && (
                                <div className="answer font-light">{faq.svar}</div>
                            )}
                        </div>
                    )
            )}
            <div className="text-center mt-10">
                <Link href="/hurtigesvar">
                    <button className="linkKnap p-10">Se alle spørgsmål og svar</button>
                </Link>
            </div>
        </div>
    );
}

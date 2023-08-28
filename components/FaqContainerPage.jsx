import { useState } from "react";
import { faqData } from "../app/utils/faqData";

export default function FaqContainer() {
    const [expandedId, setExpandedId] = useState(null);

    const toggleAnswer = (index) => {
        setExpandedId((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="bg-darkblue px-4 lg:px-8 py-16 lg:p-20 shadow-2xl rounded-xl mt-10">
            <div className="text-white mb-10">
                <h2 className="font-semibold leading-tight text-5xl text-white text-center lg:text-start">
                    Ofte stilte spørgsmål
                </h2>
                <p className="mt-12 w-full lg:w-8/12 text-center lg:text-start">
                    Vi har samlet rigtig mange spørgsmål sammen fra jer og svaret på så mange som
                    muligt, så alle kan lære lidt om tag. Se alle spørgsmål og svar på siden
                    hurtigesvar her har vi besvaret {faqData.length} spørgsmål.
                </p>
            </div>
            {faqData.map((faq, index) => (
                <div className="faq-item" key={index} onClick={() => toggleAnswer(index)}>
                    <div className="question font-normal">{faq.spørgsmål}</div>
                    {expandedId === index && <div className="answer font-light">{faq.svar}</div>}
                </div>
            ))}
        </div>
    );
}

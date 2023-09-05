// Component to insert FAQ section on page including the FAQ accordion and JsonLd FAQ schema

import { FAQPageJsonLd } from 'next-seo';

export default function FAQComponent(props) {
    return (
        <>
            <FAQPageJsonLd
                mainEntity={[
                    {
                        questionName: props.mainEntity[0].questionName,
                        acceptedAnswerText: props.mainEntity[0].acceptedAnswerText,
                    },
                    {
                        questionName: props.mainEntity[1].questionName,
                        acceptedAnswerText: props.mainEntity[1].acceptedAnswerText,
                    },
                    {
                        questionName: props.mainEntity[2].questionName,
                        acceptedAnswerText: props.mainEntity[2].acceptedAnswerText,
                    },
                    {
                        questionName: props.mainEntity[3].questionName,
                        acceptedAnswerText: props.mainEntity[3].acceptedAnswerText,
                    },
                    {
                        questionName: props.mainEntity[4].questionName,
                        acceptedAnswerText: props.mainEntity[4].acceptedAnswerText,
                    },
                ]}
            />
            <div className="faq-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="lg:col-span-2">
                        <h2 className="mb-5">Ofte stillede spørgsmål</h2>
                        <div className="question">
                            {props.mainEntity[0].questionName}
                        </div>
                        <div className="answer">
                            {props.mainEntity[0].acceptedAnswerText}
                        </div>
                        <div className="question">
                            {props.mainEntity[1].questionName}
                        </div>
                        <div className="answer">
                            {props.mainEntity[1].acceptedAnswerText}
                        </div>
                        <div className="question">
                            {props.mainEntity[2].questionName}
                        </div>
                        <div className="answer">
                            {props.mainEntity[2].acceptedAnswerText}
                        </div>
                        <div className="question">
                            {props.mainEntity[3].questionName}
                        </div>
                        <div className="answer">
                            {props.mainEntity[3].acceptedAnswerText}
                        </div>
                        <div className="question">
                            {props.mainEntity[4].questionName}
                        </div>
                        <div className="answer">
                            {props.mainEntity[4].acceptedAnswerText}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

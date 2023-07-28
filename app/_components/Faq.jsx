import FaqContainer from "./FaqContainerLandingPage";

export default function Faq(props) {
    return (
        <section>
            <div className="container">
                <FaqContainer home={props.home} />
            </div>
        </section>
    );
}

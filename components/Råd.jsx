export default function Råd(props) {
    return (
        <div className="p-5 border rounded-xl råd">
            <div className="numberBox">
                <p className="font-semibold text-sm">{props.nummer}</p>
            </div>
            <h4 className="text-2xl font-semibold mt-5 break-words">{props.titel}</h4>
            <p className="mt-5 font-light">{props.beskrivelse}</p>
            <p className="text-md font-light mt-5"> - {props.forfatter}</p>
        </div>
    );
}

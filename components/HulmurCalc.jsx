import { useState, useEffect } from 'react'

export default function HulmurCalc() {
    const [kvadratMeter, setKvadratMeter] = useState(0);
    const [isolering, setIsolering] = useState(0);
    const [opvarmning, setOpvarmning] = useState(0);
    const [pris, setPris] = useState(0);

    useEffect(() => {
        setPris((kvadratMeter * isolering * opvarmning) / 1000);
    }, [kvadratMeter, isolering, opvarmning]);

    return (
        <div>
            <label htmlFor="kvadratMeter">Kvadratmeter:</label>
            <input type="number" id="kvadratMeter" value={kvadratMeter} onChange={(e) => setKvadratMeter(e.target.value)} />

            <label htmlFor="isolering">Isolering:</label>
            <input type="number" id="isolering" value={isolering} onChange={(e) => setIsolering(e.target.value)} />

            <label htmlFor="opvarmning">Opvarmning:</label>
            <input type="number" id="opvarmning" value={opvarmning} onChange={(e) => setOpvarmning(e.target.value)} />

            <p>Pris: {pris}</p>
        </div>
    )
};
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingModal from "./LoadingModal";

// Eksporter AdresseSearch-komponenten
const AdresseSearch = (props) => {
    // Tilstandsstyring med useState-hooks
    const [searchText, setSearchText] = useState("");
    const [autocompleteResults, setAutocompleteResults] = useState([]);
    const [inputState, setInputState] = useState(false);

    const handleSearchTextChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        e.stopPropagation();
    };
    const adressEvent = () => {
        // Find element with id of "loadingModal" and set position to fixed
        const loadingModal = document.getElementById("loadingModal");
        loadingModal.style.position = "fixed";
        loadingModal.style.display = "flex";
    }
    const fetchAutocompleteResults = async (searchText) => {
        if (searchText.trim() !== "") {
            try {
                const response = await fetch(
                    `https://api.dataforsyningen.dk/autocomplete?type=adresse&q=${searchText}`
                );
                const data = await response.json();
                return data.slice(0, 5); // Limit the results to two items
            } catch (error) {
                console.error("Error:", error);
                return [];
            }
        } else {
            // Reset autocomplete results if the search text is empty
            return [];
        }
    };

    // Effekthåndtering med useEffect-hook
    useEffect(() => {
        const fetchResults = async () => {
            // Hent autoudfyldningsresultater ved at kalde fetchAutocompleteResults-funktionen
            const results = await fetchAutocompleteResults(searchText);
            setAutocompleteResults(results);
        };

        if (searchText.trim() !== "") {
            fetchResults();
        } else {
            setAutocompleteResults([]);
        }
    }, [searchText]);
    // Show input and hide button when button is clicked
    const setInputStateFunction = (state) => () => {
        setInputState(state);
    };

    return (
        <>
            <LoadingModal text="Henter Boligdata..." hidden={true} />
            <div className="addressInputDiv">
                <div className={`addressInputWrapper ${inputState ? "block" : "hidden"} transition-all`}>
                    {/* Render en tekstinput til søgeteksten */}
                    <input
                        className="addressInput"
                        type="text"
                        value={searchText}
                        autoComplete="street-address"
                        placeholder="Indtast adresse"
                        onChange={(e) => {
                            handleSearchTextChange(e);
                            setSearchText(e.target.value);
                        }}
                    />
                    <div
                        className={`${searchText === "" ? "hidden" : "block"
                            } forslagsListe`}>
                        {autocompleteResults.length === 0 && (
                            <div className="bg-white p-5 w-full text-start rounded-lg">
                                Indtast gyldig adresse
                            </div>
                        )}
                        {autocompleteResults.map((result) => (
                            <Link onClick={adressEvent} key={result.tekst} href={`/beregning?adresse=${result.tekst}`}>
                                {autocompleteResults.length > 0 && (
                                    <div className="bg-white p-5 w-full text-start hover:bg-mygreen hover:text-white active:bg-mygreen active:text-white rounded-lg">
                                        {result.tekst}
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                    <Link className="text-center" href={`/beregning`}>
                        <p className="text-sm mt-2">Ønsker du ikke at indtaste din adresse kan fortsætte med manuel indtastning her.</p>
                    </Link>
                </div>
                <div className={`searchButtonDiv ${inputState ? "hidden" : "block"} transition-all sticky top-0`}>
                    <button
                        className="w-full font-medium bg-orange-500 text-white p-5 rounded-lg shadow-lg hover:bg-orange-600 active:bg-orange-700"
                        onClick={setInputStateFunction(true)}
                    >
                        Start her
                    </button>
                </div>
            </div>
        </>
    );
};

// Eksporter AdresseSearch-komponenten som standard eksport
export default AdresseSearch;

import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useLoadScript } from '@react-google-maps/api';
import { useState } from 'react';
import MotionDiv from "./MotionDiv";
import styles from '../styles/Home.module.css';

const libraries = ['places'];


export default function HulmurSearch() {
    const [lat, setLat] = useState(55.4037);
    const [lng, setLng] = useState(10.40237);
    const [zoom, setZoom] = useState(7);
    const [showMap, setShowMap] = useState(false);
    const [drawingMode, setDrawingMode] = useState('polygon');
    const [perimeter, setPerimeter] = useState(0);
    const [wallArea, setWallArea] = useState(0);
    const [height, setHeight] = useState(2.5);
    const { isLoaded, loadError } = useLoadScript({

        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });


    if (!isLoaded) return 'Indlæser beregner...';
    if (loadError) return 'Error loading maps';

    return (
        <MotionDiv>
            <PlacesAutocomplete
                onAddressSelect={(address) => {
                    getGeocode({ address: address }).then((results) => {
                        const { lat, lng } = getLatLng(results[0]);
                        setLat(lat);
                        setLng(lng);
                        setZoom(20);
                        setShowMap(true);
                    });
                }}
            />
        </MotionDiv>
    )
}

const PlacesAutocomplete = ({ onAddressSelect }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: { componentRestrictions: { country: 'dk' } },
        debounce: 300,
        cache: 86400,
    });
    const renderSuggestions = () => {
        return data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
                description,
            } = suggestion;

            return (
                <li
                    key={place_id}
                    onClick={() => {
                        setValue(description, false);
                        clearSuggestions();
                        onAddressSelect && onAddressSelect(description);
                    }}
                >
                    <strong>{main_text}</strong>, <small>{secondary_text}</small>
                </li>
            );
        });
    };
    return (
        <div className="addressInputDiv">
            <div className="addressInputWrapper">
                <input
                    value={value}
                    className="addressInput"
                    autoComplete="street-address"
                    disabled={!ready}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Indtast din adresse"
                />
                {status === 'OK' && (
                    <ul className="forslagsListe">{renderSuggestions()}</ul>
                )}
            </div>
        </div>
    );
};
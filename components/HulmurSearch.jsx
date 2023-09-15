import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useLoadScript, GoogleMap, DrawingManager } from '@react-google-maps/api';
import { useState, useEffect, useMemo } from 'react';
import MotionDiv from "./MotionDiv";

const libraries = ['places', 'drawing', 'geometry'];

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

    useEffect(() => {
        setWallArea(perimeter * height);
    }, [perimeter, height]);

    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);
    const zoomLevel = useMemo(() => zoom, [zoom]);

    if (!isLoaded) return "Loading Maps";
    if (loadError) return "Error loading maps";

    return (
        <>
            <MotionDiv>
                <PlacesAutocomplete
                    onAddressSelect={(address) => {
                        getGeocode({ address: address }).then((results) => {
                            const { lat, lng } = getLatLng(results[0]);
                            setLat(lat);
                            setLng(lng);
                            setShowMap(true);
                            setZoom(20);
                            setShowMap(true);
                        });
                    }}
                />
                <div className="text-center">
                    <p className="text-sm mt-2">Ønsker du ikke at indtaste din adresse kan fortsætte med manuel indtastning her.</p>
                </div>
            </MotionDiv>
            {showMap && (
                <MotionDiv>
                    <h2 className='text-center my-4'>Vælg dine ydremure for at fortsætte</h2>
                    <div className='md:flex gap-4'>
                        <GoogleMap
                            zoom={zoomLevel}
                            center={mapCenter}
                            tilt={0}
                            mapContainerStyle={{
                                height: '500px',
                                width: '100%',
                                marginBottom: '2rem',
                            }}
                            mapContainerClassName='basis-3/4'
                            options={{
                                disableDefaultUI: true,
                                zoomControl: true,
                                mapTypeId: 'satellite',
                                scrollwheel: true,
                            }}
                        >
                            <DrawingManager
                                drawingMode={drawingMode}
                                options={{
                                    drawingControl: false,
                                    drawingControlOptions: {
                                        position: 2,
                                        drawingModes: [
                                            'polygon',
                                        ],
                                    },
                                }}
                                // remove last point when "d" is pressed
                                onOverlayComplete={(e) => {
                                    console.log(e);
                                }
                                }
                                onClick={(e) => {
                                    console.log(e);
                                }}
                                onPolygonComplete={(polygon) => {
                                    setDrawingMode(null);
                                    const polygonBounds = polygon.getPath();
                                    const polygonPerimeter = google.maps.geometry.spherical.computeLength(
                                        polygonBounds
                                    );
                                    setPerimeter(polygonPerimeter);
                                    // Make polygon editable
                                    polygon.setOptions({ editable: true, draggable: true, clickable: true });
                                    // Add listener  do vertex drag
                                    google.maps.event.addListener(polygon.getPath(), "set_at", () => {
                                        // Recalculate perimeter
                                        const polygonBounds = polygon.getPath();
                                        const polygonPerimeter = google.maps.geometry.spherical.computeLength(
                                            polygonBounds
                                        );
                                        setPerimeter(polygonPerimeter);
                                    });
                                    // Add listener to vertex insert
                                    google.maps.event.addListener(polygon.getPath(), "insert_at", () => {
                                        const polygonBounds = polygon.getPath();
                                        const polygonPerimeter = google.maps.geometry.spherical.computeLength(
                                            polygonBounds
                                        );
                                        setPerimeter(polygonPerimeter);
                                    });
                                }}
                            />
                        </GoogleMap>
                        <div className="results basis-1/4">
                            {perimeter > 0 && (
                                <>
                                    <h2>Resultater</h2>
                                    <p>Omkreds af hus: {perimeter.toFixed(2)} meter</p>
                                    {perimeter > 0 && (
                                        <p>Antal m2 facade: {wallArea.toFixed(2)} m2</p>
                                    )}
                                    <div className="sporgsmål">
                                        <label htmlFor="hulmursisolering">Højde til tagrende</label>
                                        <input type="number" name="tagrende" id="tagrende" step={0.1} defaultValue={2.5}
                                            onChange={
                                                (e) => {
                                                    setHeight(e.target.value);
                                                }
                                            } />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </MotionDiv>
            )}
        </>
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
import { useLoadScript, GoogleMap, DrawingManager } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useState, useMemo, useEffect } from 'react';
import styles from '../../styles/Home.module.css';
import Seo from '../../components/Seo';

const libraries = ['places', 'drawing', 'geometry'];

export default function Page() {
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

    function whenLoaded() {
        class DeleteMenu extends google.maps.OverlayView {
            div_;
            divListener_;
            constructor() {
                super();
                this.div_ = document.createElement("div");
                this.div_.className = "delete-menu";
                this.div_.innerHTML = "Delete";

                const menu = this;

                google.maps.event.addDomListener(this.div_, "click", () => {
                    menu.removeVertex();
                });
            }
            onAdd() {
                const deleteMenu = this;
                const map = this.getMap();

                this.getPanes().floatPane.appendChild(this.div_);
                // mousedown anywhere on the map except on the menu div will close the
                // menu.
                this.divListener_ = google.maps.event.addDomListener(
                    map.getDiv(),
                    "mousedown",
                    (e) => {
                        if (e.target != deleteMenu.div_) {
                            deleteMenu.close();
                        }
                    },
                    true,
                );
            }
            onRemove() {
                if (this.divListener_) {
                    google.maps.event.removeListener(this.divListener_);
                }

                this.div_.parentNode.removeChild(this.div_);
                // clean up
                this.set("position", null);
                this.set("path", null);
                this.set("vertex", null);
            }
            close() {
                this.setMap(null);
            }
            draw() {
                const position = this.get("position");
                const projection = this.getProjection();

                if (!position || !projection) {
                    return;
                }

                const point = projection.fromLatLngToDivPixel(position);

                this.div_.style.top = point.y + "px";
                this.div_.style.left = point.x + "px";
            }
            /**
             * Opens the menu at a vertex of a given path.
             */
            open(map, path, vertex) {
                this.set("position", path.getAt(vertex));
                this.set("path", path);
                this.set("vertex", vertex);
                this.setMap(map);
                this.draw();
            }
            /**
             * Deletes the vertex from the path.
             */
            removeVertex() {
                const path = this.get("path");
                const vertex = this.get("vertex");

                if (!path || vertex == undefined) {
                    this.close();
                    return;
                }

                path.removeAt(vertex);
                this.close();
            }
        }
        const deleteMenu = new DeleteMenu();
    }

    if (!isLoaded) return 'Indlæser beregner...';
    if (loadError) return 'Error loading maps';

    return (
        <>
            <Seo
                title="Hulmursisolering prisberegner"
                description="Hulmursisolering prisberegner"
                canonical="https://www.tagberegneren.dk/hulmursisolering/beregner"
                type="webpage"
            />
            <div className='text-center'>
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
                {showMap && (
                    <div className='md:flex'>
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
                            onLoad={(map) => {
                                console.log('map: ', map);
                            }
                            }
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
                )}
            </div>
        </>
    );
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
                    <strong>{main_text}</strong> <small>{secondary_text}</small>
                </li>
            );
        });
    };
    return (
        <div className={styles.autocompleteWrapper}>
            <input
                value={value}
                className={styles.autocompleteInput}
                disabled={!ready}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Indtast din adresse"
            />
            {status === 'OK' && (
                <ul className={styles.suggestionWrapper}>{renderSuggestions()}</ul>
            )}
        </div>
    );
};
import React, { useState, useEffect } from 'react';
import { GoogleMap, MarkerF, useLoadScript, DirectionsRenderer} from '@react-google-maps/api';

const MapContainer = ({onAddress, currentAddress}) => {

    const [addressMarker, setAddressMarker] = useState(null);
    const [pinAddress, setPinAddress] = useState();
    const [directions, setDirections] = useState();
    const [time, setTime] = useState();
    const { isLoaded, loadError } = useLoadScript({googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY});
    const mapRef = React.useRef();
    
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        if(currentAddress !== '' && currentAddress !== pinAddress) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: currentAddress }, (results, status) => {
                if(status === 'OK'){
                    const location = results[0].geometry.location;
                    const latLng = {
                        lat: location.lat(),
                        lng: location.lng()
                    };
                    setAddressMarker(latLng);
                }
            });
        }
    }, [currentAddress]);

    useEffect(() => {
        if(addressMarker){
            calculateRoute(addressMarker, defaultCenter);
        }
    }, [addressMarker])

    if (loadError) return "Error";
    if (!isLoaded) return "Maps";

    const mapStyles = {
        height: '100%',
        width: '100%'
    };

    const defaultCenter = {
        lat: 50.44406477663441,
        lng: 30.520341310535077
    };

    const handlePinAddressMarker = (event) =>{
        const geocoder = new window.google.maps.Geocoder();
        const clickedLatLng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }
        setAddressMarker(clickedLatLng);
        geocoder.geocode({ location: clickedLatLng }, (results, status) => {
            if(status === 'OK'){
                if(results[0]){
                    onAddress(results[0].formatted_address);
                    setPinAddress(results[0].formatted_address);
                }
            }
        });
    }

    const calculateRoute = (start, end) => {
        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: start,
                destination: end,
                travelMode: 'DRIVING'
            },
            (result, status) => {
                if(status === 'OK'){
                    setDirections(result);
                    if(result.routes.length > 0 && result.routes[0].legs.length > 0){
                        setTime(result.routes[0].legs[0].duration.text);
                    }
                }
            }
        );
    };

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            onLoad={onMapLoad}
            center={defaultCenter}
            onClick={handlePinAddressMarker}
            options={{disableDefaultUI: true}}
        >
            <MarkerF position={defaultCenter} icon={{url: 'images/drugs.svg', scaledSize: new window.google.maps.Size(40, 40)}}/>
            {addressMarker && <MarkerF position={addressMarker} />}
            <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }}/>
            {time && 
                <div style={{ position: 'absolute', top: '2px', left: '2px', backgroundColor: 'white', padding: '5px'}}>
                    <h2 className='text-xs'>Estimated time in driving mode: {time}</h2>
                </div>
            }
        </GoogleMap>
    );
}

export default MapContainer;
import { Geolocation } from '@ionic-native/geolocation'
import { IonLoading } from '@ionic/react';
import { Map, GoogleApiWrapper, Marker } from "google-maps-react"
import { React, useEffect, useState } from "react";

const MapContainer = (props) => {


    const [userlat, setUserLat ] = useState('')
    const [userlng, setUserLng ] = useState('')

    const containerStyle = {
        width: '100%',
        height: '100%'
    }

    useEffect( async () => {
        const position = await Geolocation.getCurrentPosition();
        setUserLat(position.coords.latitude)
        setUserLng(position.coords.longitude)
    }, []);
   
    

    return (
        <Map
            google={props.google}
            zoom={14}
            containerStyle={containerStyle}
            center={{
                lat: userlat,
                lng: userlng
            }}
        >
            <Marker
                name={"ubicacion-actual"}
                position={{
                    lat: userlat,
                    lng: userlng
                }}
            />

        </Map>
    )

}

export default GoogleApiWrapper(
    (props) => ({
        apiKey: ('AIzaSyAcW191qRfL43wIU0uqzMB-lBFjYepUCko')
    })

)(MapContainer)

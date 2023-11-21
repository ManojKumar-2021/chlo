import React, { useEffect, useState } from 'react'
import { Map } from 'leaflet'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
// import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';


function MapPage() {
  const [data, setData] = useState({ latitude: "", longitude: "" })

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(((position) => {
        const { latitude, longitude } = position.coords
        setData({ latitude, longitude });
      }));
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {console.log("data", data)}

      {
        data.latitude && data.longitude ?
          <MapContainer center={[data?.latitude, data?.longitude]} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[data?.latitude, data?.longitude]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          : <p>Loading.......</p>}
    </div>
  )
}

export default MapPage

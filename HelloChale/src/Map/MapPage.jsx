import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';


function MapPage() {
  const [data, setData] = useState({ latitude: "", longitude: "" })

  //continous location
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setData({ latitude, longitude });
        console.log("position", position)
      },
      (error) => {
        console.log('Error to get the location:', error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Minimum distance (in meters) before receiving updates
        interval: 500, // Minimum time (in milliseconds) between updates
        fastestInterval: 2000, // Fastest update interval when other apps are requesting location
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // Clean up when component unmounts
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      {console.log("Re-render")}
      {
        data.latitude && data.longitude ?
          <MapContainer center={[data?.latitude, data?.longitude]} zoom={13} scrollWheelZoom={true} style={{ height: "100%" }}>
            <TileLayer
              // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[data?.latitude, data?.longitude]}>
              <Popup>
                {`${data?.latitude} ${data?.longitude}`}
              </Popup>
            </Marker>
          </MapContainer>
          : <p>Loading.......</p>}
    </div>
  )
}

export default MapPage

/*
NOTE:::

liveLocation data in mongodb
timestamp for generate the daily report

{
  _id:857rtngfg589rgvt845h,
  cordinates:[{ coordinates: [12.971598, 77.594562], timestamp: '2023-11-20T12:30:00Z' },];
}


*/

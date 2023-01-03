import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";

function MapPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://eonet.sci.gsfc.nasa.gov/api/v3/events")
      .then((response) => response.json())
      .then((data) => setEvents(data.events));
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={2}>
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[
            event.geometries[0].coordinates[1],
            event.geometries[0].coordinates[0],
          ]}
        >
          <Popup>{event.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  // return (
  //   <div>
  //     <h1>This is working</h1>
  //   </div>
  // );
}

export default MapPage;
